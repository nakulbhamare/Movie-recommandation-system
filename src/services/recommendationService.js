import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { mockStore } from '../lib/mockStore';

export const recommendationService = {
  /**
   * Generates recommendations based on:
   * 1. Content-based filtering (user's past high ratings + genre affinities)
   * 2. Popularity-based fallback (if user has no ratings or is a guest)
   */
  async getRecommendations(userId = null) {
    let allMovies = [];
    let userRatings = [];
    let allGenres = mockStore.genres;

    // 1. Fetch current catalog and ratings
    if (isSupabaseConfigured && userId) {
      try {
        // Fetch user ratings
        const { data: userRated, error: rError } = await supabase
          .from('ratings')
          .select('movie_id, rating')
          .eq('user_id', userId);

        if (!rError && userRated) {
          userRatings = userRated;
        }

        // Fetch movies with summary
        const { data: moviesData, error: mError } = await supabase
          .from('movie_rating_summary')
          .select('*, movie_genres(genre_id, genres(genre_id, genre_name))');

        if (!mError && moviesData) {
          allMovies = moviesData.map(m => ({
            ...m,
            genre_ids: (m.movie_genres || []).map(mg => mg.genre_id),
            genres: (m.movie_genres || []).map(mg => mg.genres).filter(Boolean),
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch failed for recommendations, using mockStore:', err.message);
        allMovies = mockStore.getMovies();
        userRatings = userId ? mockStore.getRatings().filter(r => r.user_id === userId) : [];
      }
    } else {
      allMovies = mockStore.getMovies();
      userRatings = userId ? mockStore.getRatings().filter(r => r.user_id === userId) : [];
    }

    // Genre lookup map
    const genreMap = new Map(allGenres.map(g => [g.genre_id, g.genre_name]));

    // 2. Identify rated movie IDs
    const ratedMovieMap = new Map();
    for (const r of userRatings) {
      ratedMovieMap.set(Number(r.movie_id), Number(r.rating));
    }

    // Filter candidate movies: exclude movies already rated by the user
    const candidateMovies = allMovies.filter(m => !ratedMovieMap.has(Number(m.movie_id)));

    // 3. Check if user has high ratings (4 or 5 stars)
    const highRatedEntries = userRatings.filter(r => Number(r.rating) >= 4);

    // If no ratings, return Popularity-Based Recommendations
    if (!userId || highRatedEntries.length === 0) {
      return this.getPopularityBasedRecommendations(candidateMovies, genreMap);
    }

    // 4. Content-Based Recommendation Algorithm
    // Calculate Genre Affinity scores from user's ratings
    const genreAffinity = {}; // genre_id -> weight

    for (const ratingObj of userRatings) {
      const ratedMovie = allMovies.find(m => Number(m.movie_id) === Number(ratingObj.movie_id));
      if (!ratedMovie) continue;

      const score = Number(ratingObj.rating);
      let weight = 0;
      if (score === 5) weight = 5;
      else if (score === 4) weight = 3;
      else if (score === 3) weight = 1;
      else weight = -2; // penalize disliked genres

      for (const gid of ratedMovie.genre_ids || []) {
        genreAffinity[gid] = (genreAffinity[gid] || 0) + weight;
      }
    }

    // Find the user's top preferred genre for tailored explanation
    let topGenreId = null;
    let maxAffinity = 0;
    for (const [gidStr, score] of Object.entries(genreAffinity)) {
      if (score > maxAffinity) {
        maxAffinity = score;
        topGenreId = Number(gidStr);
      }
    }
    const topGenreName = genreMap.get(topGenreId) || 'your favorite genres';

    // 5. Score every candidate movie
    const scoredCandidates = candidateMovies.map(movie => {
      // A. Genre Match Score
      let movieGenreScore = 0;
      let matchedGenreNames = [];

      for (const gid of movie.genre_ids || []) {
        if (genreAffinity[gid] && genreAffinity[gid] > 0) {
          movieGenreScore += genreAffinity[gid];
          matchedGenreNames.push(genreMap.get(gid));
        }
      }

      // Normalize genre score to 0..10 scale
      const normalizedGenreScore = maxAffinity > 0 
        ? Math.min(10, (movieGenreScore / maxAffinity) * 10) 
        : 0;

      // B. Quality Score (average user rating 0..5 scaled to 0..10)
      const avgRating = Number(movie.average_rating || 0);
      const qualityScore = avgRating * 2;

      // C. Popularity Score (popularity is roughly 70-100, scale to 0..10)
      const popScore = Math.min(10, Math.max(0, (Number(movie.popularity || 75) - 60) / 4));

      // Weighted Total Score:
      // 50% Genre Affinity + 30% Rating Quality + 20% Popularity
      const totalScore = (normalizedGenreScore * 0.50) + (qualityScore * 0.30) + (popScore * 0.20);

      // Tailored explanation
      let explanation = '';
      if (movieGenreScore > 0 && matchedGenreNames.length > 0) {
        explanation = `Recommended because you enjoy ${matchedGenreNames.slice(0, 2).join(' & ')} movies`;
      } else if (avgRating >= 4.5) {
        explanation = `Critically acclaimed with a stellar ${avgRating}★ community rating`;
      } else {
        explanation = `Trending blockbuster loved by cinema fans`;
      }

      return {
        ...movie,
        recommendation_score: Number(totalScore.toFixed(2)),
        explanation,
        recommendation_type: 'content_based',
        matched_genres: matchedGenreNames,
      };
    });

    // 6. Sort by total recommendation score descending and return Top 10
    const top10 = scoredCandidates
      .sort((a, b) => b.recommendation_score - a.recommendation_score)
      .slice(0, 10);

    return {
      type: 'content_based',
      description: `Personalized suggestions based on your high ratings in ${topGenreName}`,
      movies: top10,
    };
  },

  /**
   * Fallback: Popularity-Based Recommendations for new users / guest mode
   */
  getPopularityBasedRecommendations(candidates, genreMap) {
    const scored = candidates.map(movie => {
      const avg = Number(movie.average_rating || 0);
      const pop = Number(movie.popularity || 80);

      // Popularity + Rating combined score
      const score = (pop * 0.6) + (avg * 20 * 0.4);

      const firstGenre = movie.genres?.[0]?.genre_name || 
        (movie.genre_ids?.[0] ? genreMap.get(movie.genre_ids[0]) : 'Top Movies');

      return {
        ...movie,
        recommendation_score: Number(score.toFixed(1)),
        explanation: `Popular community favorite in ${firstGenre}`,
        recommendation_type: 'popularity_based',
      };
    });

    const top10 = scored
      .sort((a, b) => b.recommendation_score - a.recommendation_score)
      .slice(0, 10);

    return {
      type: 'popularity_based',
      description: 'Trending and highest-rated movies across all genres (Rate movies to personalize!)',
      movies: top10,
    };
  },
};
