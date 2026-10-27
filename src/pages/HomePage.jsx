import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Award, Film, ArrowRight, Loader2 } from 'lucide-react';
import { movieService } from '../services/movieService';
import { recommendationService } from '../services/recommendationService';
import { useAuth } from '../context/AuthContext';
import HeroBanner from '../components/HeroBanner';
import MovieCard from '../components/MovieCard';

export default function HomePage() {
  const { user } = useAuth();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recommendedData, setRecommendedData] = useState({ movies: [] });
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadHomeContent() {
      try {
        setLoading(true);

        const [genresList, trending, topRated] = await Promise.all([
          movieService.getGenres(),
          movieService.getTrendingMovies(8),
          movieService.getTopRatedMovies(8),
        ]);

        if (!isMounted) return;

        setGenres(genresList);
        setTrendingMovies(trending);
        setTopRatedMovies(topRated);

        // Set high-impact featured movie (e.g. Inception or Interstellar)
        const featured = trending.find((m) => m.movie_id === 1 || m.movie_id === 3) || trending[0];
        setFeaturedMovie(featured);

        // Fetch recommendations for current user
        const recs = await recommendationService.getRecommendations(user?.id);
        if (isMounted) {
          setRecommendedData(recs);
        }
      } catch (err) {
        console.error('Failed to load home page content:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadHomeContent();

    return () => {
      isMounted = false;
    };
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
        <p className="text-sm text-neutral-400 font-medium">Loading CineMatch Catalog...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* 1. Hero Section */}
      {featuredMovie && <HeroBanner movie={featuredMovie} />}

      {/* 2. Recommended For You Section */}
      <section className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-amber-500/10 text-amber-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Recommended For You
              </h2>
            </div>
            <p className="text-xs text-neutral-400">
              {recommendedData.description || 'Intelligent recommendations based on your preferences'}
            </p>
          </div>
          <Link
            to="/recommendations"
            className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            Algorithm Insights <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {recommendedData.movies.slice(0, 4).map((movie) => (
            <MovieCard
              key={movie.movie_id}
              movie={movie}
              showExplanation={true}
            />
          ))}
        </div>
      </section>

      {/* 3. Trending Movies Section */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-rose-500/10 text-rose-400">
              <TrendingUp className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Trending Movies
            </h2>
          </div>
          <Link
            to="/discover?sortBy=popularity"
            className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-400 hover:text-amber-400 transition-colors"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingMovies.slice(0, 4).map((movie) => (
            <MovieCard key={movie.movie_id} movie={movie} />
          ))}
        </div>
      </section>

      {/* 4. Browse By Genre Section */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-6">
          <span className="p-1 rounded-md bg-cyan-500/10 text-cyan-400">
            <Film className="w-4 h-4" />
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Browse By Genre
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {genres.map((g) => (
            <Link
              key={g.genre_id}
              to={`/discover?genreId=${g.genre_id}`}
              className="p-3.5 rounded-xl bg-[#141622] border border-white/5 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all text-center group flex flex-col items-center justify-center"
            >
              <span className="text-xs font-semibold text-neutral-300 group-hover:text-amber-300 transition-colors">
                {g.genre_name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Top Rated Movies Section */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-yellow-500/10 text-yellow-400">
              <Award className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Top Rated Cinema
            </h2>
          </div>
          <Link
            to="/discover?sortBy=rating"
            className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-400 hover:text-amber-400 transition-colors"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
          {topRatedMovies.slice(0, 4).map((movie) => (
            <MovieCard key={movie.movie_id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
