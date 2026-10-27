import { GENRES, MOVIES, SAMPLE_RATINGS } from './seedData';

const STORAGE_KEYS = {
  RATINGS: 'cinematch_mock_ratings',
  WATCHLIST: 'cinematch_mock_watchlist',
  USERS: 'cinematch_mock_users',
  CURRENT_USER: 'cinematch_mock_current_user',
};

// Default Demo User for Instant Viva Presentation
export const DEFAULT_DEMO_USER = {
  id: '00000000-0000-0000-0000-000000000001',
  email: 'student@cinematch.edu',
  user_metadata: {
    username: 'adbms_student',
    full_name: 'ADBMS Mini-Project Student',
    is_admin: true,
  },
  created_at: new Date('2024-01-01').toISOString(),
};

// Initial Ratings preloaded for realistic recommendations
const initialRatings = SAMPLE_RATINGS.map(sr => ({
  rating_id: sr.rating_id,
  user_id: DEFAULT_DEMO_USER.id,
  movie_id: sr.movie_id,
  rating: sr.rating,
  review: sr.review,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}));

class MockStore {
  constructor() {
    this.genres = GENRES;
    this.initStorage();
  }

  initStorage() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(STORAGE_KEYS.RATINGS)) {
      localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(initialRatings));
    }

    if (!localStorage.getItem(STORAGE_KEYS.WATCHLIST)) {
      // Preload 2 sample watchlist items for demo
      const sampleWatchlist = [
        { watchlist_id: 1, user_id: DEFAULT_DEMO_USER.id, movie_id: 19, added_at: new Date().toISOString() }, // Dune
        { watchlist_id: 2, user_id: DEFAULT_DEMO_USER.id, movie_id: 25, added_at: new Date().toISOString() }, // Oppenheimer
      ];
      localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(sampleWatchlist));
    }
  }

  getRatings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RATINGS);
      return data ? JSON.parse(data) : initialRatings;
    } catch {
      return initialRatings;
    }
  }

  saveRatings(ratings) {
    localStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings));
  }

  getWatchlist() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WATCHLIST);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  saveWatchlist(watchlist) {
    localStorage.setItem(STORAGE_KEYS.WATCHLIST, JSON.stringify(watchlist));
  }

  // Get enriched movies with average rating and genre objects
  getMovies() {
    const ratings = this.getRatings();
    const genreMap = new Map(this.genres.map(g => [g.genre_id, g]));

    return MOVIES.map(movie => {
      const movieRatings = ratings.filter(r => Number(r.movie_id) === Number(movie.movie_id));
      const ratingCount = movieRatings.length;
      const avgRating = ratingCount > 0
        ? Number((movieRatings.reduce((sum, r) => sum + Number(r.rating), 0) / ratingCount).toFixed(1))
        : 0;

      const movieGenres = (movie.genre_ids || [])
        .map(gid => genreMap.get(gid))
        .filter(Boolean);

      return {
        ...movie,
        average_rating: avgRating,
        rating_count: ratingCount,
        genres: movieGenres,
      };
    });
  }

  getMovieById(movieId) {
    const movies = this.getMovies();
    return movies.find(m => Number(m.movie_id) === Number(movieId)) || null;
  }

  getRatingsForMovie(movieId) {
    const ratings = this.getRatings();
    return ratings
      .filter(r => Number(r.movie_id) === Number(movieId))
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }

  getUserRating(userId, movieId) {
    if (!userId) return null;
    const ratings = this.getRatings();
    return ratings.find(r => r.user_id === userId && Number(r.movie_id) === Number(movieId)) || null;
  }

  submitRating(userId, movieId, rating, review = '', username = 'User') {
    const ratings = this.getRatings();
    const existingIndex = ratings.findIndex(
      r => r.user_id === userId && Number(r.movie_id) === Number(movieId)
    );

    const now = new Date().toISOString();

    if (existingIndex >= 0) {
      ratings[existingIndex] = {
        ...ratings[existingIndex],
        rating: Number(rating),
        review: review || '',
        updated_at: now,
      };
    } else {
      const newRating = {
        rating_id: Date.now(),
        user_id: userId,
        movie_id: Number(movieId),
        rating: Number(rating),
        review: review || '',
        username,
        created_at: now,
        updated_at: now,
      };
      ratings.push(newRating);
    }

    this.saveRatings(ratings);
    return true;
  }

  getUserWatchlist(userId) {
    if (!userId) return [];
    const watchlist = this.getWatchlist();
    const userEntries = watchlist.filter(w => w.user_id === userId);
    const movies = this.getMovies();
    const movieMap = new Map(movies.map(m => [m.movie_id, m]));

    return userEntries
      .map(entry => {
        const movie = movieMap.get(Number(entry.movie_id));
        if (!movie) return null;
        return {
          ...entry,
          movie,
        };
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.added_at) - new Date(a.added_at));
  }

  isInWatchlist(userId, movieId) {
    if (!userId) return false;
    const watchlist = this.getWatchlist();
    return watchlist.some(w => w.user_id === userId && Number(w.movie_id) === Number(movieId));
  }

  toggleWatchlist(userId, movieId) {
    if (!userId) return false;
    let watchlist = this.getWatchlist();
    const index = watchlist.findIndex(w => w.user_id === userId && Number(w.movie_id) === Number(movieId));

    if (index >= 0) {
      watchlist.splice(index, 1);
      this.saveWatchlist(watchlist);
      return false; // removed
    } else {
      watchlist.push({
        watchlist_id: Date.now(),
        user_id: userId,
        movie_id: Number(movieId),
        added_at: new Date().toISOString(),
      });
      this.saveWatchlist(watchlist);
      return true; // added
    }
  }

  getAdminStats() {
    const movies = this.getMovies();
    const ratings = this.getRatings();
    const watchlist = this.getWatchlist();

    const totalMovies = movies.length;
    const totalRatings = ratings.length;
    const avgRating = totalRatings > 0
      ? Number((ratings.reduce((sum, r) => sum + Number(r.rating), 0) / totalRatings).toFixed(2))
      : 0;

    // Genre distribution
    const genreCount = {};
    for (const g of this.genres) {
      genreCount[g.genre_name] = 0;
    }
    for (const m of movies) {
      for (const g of m.genres || []) {
        genreCount[g.genre_name] = (genreCount[g.genre_name] || 0) + 1;
      }
    }

    const topRatedMovies = [...movies]
      .filter(m => m.rating_count > 0)
      .sort((a, b) => b.average_rating - a.average_rating || b.rating_count - a.rating_count)
      .slice(0, 5);

    return {
      totalMovies,
      totalUsers: 12, // simulated active ADBMS lab users
      totalRatings,
      avgRating,
      totalWatchlistItems: watchlist.length,
      genreDistribution: Object.entries(genreCount).map(([name, count]) => ({ name, count })),
      topRatedMovies,
    };
  }
}

export const mockStore = new MockStore();
