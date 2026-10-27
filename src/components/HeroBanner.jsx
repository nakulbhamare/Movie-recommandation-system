import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info, Bookmark, Star, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { watchlistService } from '../services/watchlistService';

export default function HeroBanner({ movie }) {
  const { user } = useAuth();
  const [inWatchlist, setInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (user && movie) {
      watchlistService.isInWatchlist(user.id, movie.movie_id).then(setInWatchlist);
    }
  }, [user, movie]);

  if (!movie) return null;

  const handleWatchlistClick = async () => {
    if (!user) {
      alert('Please log in or switch to the Demo Student profile to save movies.');
      return;
    }
    setLoading(true);
    try {
      if (inWatchlist) {
        await watchlistService.removeFromWatchlist(user.id, movie.movie_id);
        setInWatchlist(false);
      } else {
        await watchlistService.addToWatchlist(user.id, movie.movie_id);
        setInWatchlist(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const backdrop = movie.backdrop_url || movie.poster_url;
  const rating = Number(movie.average_rating || 4.9);

  return (
    <div className="relative w-full h-[520px] md:h-[620px] overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl mb-12">
      {/* Background Backdrop Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        {/* Dynamic Multi-layered Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-transparent to-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full max-w-3xl flex flex-col justify-end p-6 md:p-12 pb-10 space-y-4">
        {/* Featured Tag */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-black shadow-lg shadow-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 fill-black" />
            Featured Presentation
          </span>
          <span className="text-xs font-mono text-neutral-300">
            {movie.release_year} • {movie.duration_mins || 148}m
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none drop-shadow-md font-['Outfit']">
          {movie.title}
        </h1>

        {/* Rating and Genre */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-amber-300 font-bold">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{rating.toFixed(1)}</span>
            <span className="text-xs text-neutral-400 font-normal ml-0.5">/ 5.0</span>
          </div>

          <div className="flex items-center gap-1.5">
            {(movie.genres || []).map((g) => (
              <span
                key={g.genre_id || g.genre_name}
                className="px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md text-xs font-medium text-neutral-200"
              >
                {g.genre_name}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-neutral-300 text-sm md:text-base leading-relaxed line-clamp-3 max-w-2xl text-shadow">
          {movie.description}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            to="/discover"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all duration-200 shadow-xl shadow-amber-500/25 hover:scale-105"
          >
            <Play className="w-4 h-4 fill-black" />
            Explore Movies
          </Link>

          <Link
            to={`/movie/${movie.movie_id}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm backdrop-blur-md border border-white/10 transition-colors"
          >
            <Info className="w-4 h-4" />
            Details & Reviews
          </Link>

          <button
            type="button"
            onClick={handleWatchlistClick}
            disabled={loading}
            className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl backdrop-blur-md border text-sm font-medium transition-all ${
              inWatchlist
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-black/40 hover:bg-white/10 text-neutral-300 hover:text-white border-white/10'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${inWatchlist ? 'fill-current text-amber-400' : ''}`} />
            {inWatchlist ? 'In Watchlist' : 'Watchlist'}
          </button>
        </div>
      </div>
    </div>
  );
}
