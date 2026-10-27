import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Star, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { watchlistService } from '../services/watchlistService';
import FallbackPoster from './FallbackPoster';

export default function MovieCard({
  movie,
  isInWatchlist = false,
  onWatchlistToggle = null,
  showExplanation = false,
}) {
  const { user } = useAuth();
  const [imageFailed, setImageFailed] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(isInWatchlist);
  const [savingWatchlist, setSavingWatchlist] = useState(false);

  // Sync prop changes
  React.useEffect(() => {
    setInWatchlist(isInWatchlist);
  }, [isInWatchlist]);

  const handleWatchlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert('Please log in or switch to the Demo Student profile to manage your watchlist.');
      return;
    }

    try {
      setSavingWatchlist(true);
      if (inWatchlist) {
        await watchlistService.removeFromWatchlist(user.id, movie.movie_id);
        setInWatchlist(false);
        if (onWatchlistToggle) onWatchlistToggle(movie.movie_id, false);
      } else {
        await watchlistService.addToWatchlist(user.id, movie.movie_id);
        setInWatchlist(true);
        if (onWatchlistToggle) onWatchlistToggle(movie.movie_id, true);
      }
    } catch (err) {
      console.error('Error toggling watchlist:', err);
    } finally {
      setSavingWatchlist(false);
    }
  };

  const primaryGenre = movie.genres?.[0]?.genre_name || 'Cinema';
  const rating = Number(movie.average_rating || 0);

  return (
    <div className="group relative flex flex-col bg-[#141622] rounded-xl overflow-hidden border border-white/5 hover:border-amber-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1">
      {/* Poster Container */}
      <Link
        to={`/movie/${movie.movie_id}`}
        className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-900 block"
      >
        {!imageFailed && movie.poster_url ? (
          <img
            src={movie.poster_url}
            alt={movie.title}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <FallbackPoster title={movie.title} year={movie.release_year} />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141622] via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Watchlist Quick Button */}
        <button
          type="button"
          onClick={handleWatchlistClick}
          disabled={savingWatchlist}
          title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
            inWatchlist
              ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
              : 'bg-black/60 text-white/80 hover:bg-white hover:text-black border border-white/10'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${inWatchlist ? 'fill-current' : ''}`} />
        </button>

        {/* Rating Badge */}
        <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-amber-300">
            {rating > 0 ? rating.toFixed(1) : 'NR'}
          </span>
        </div>

        {/* Year & Genre Pill (Overlay bottom) */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs text-neutral-300">
          <span className="font-mono text-neutral-400">{movie.release_year}</span>
          <span className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-[11px] font-medium text-neutral-200">
            {primaryGenre}
          </span>
        </div>
      </Link>

      {/* Content Info */}
      <div className="p-3.5 flex flex-col flex-1 justify-between">
        <div>
          <Link
            to={`/movie/${movie.movie_id}`}
            className="text-sm font-semibold text-white/90 hover:text-amber-400 line-clamp-1 transition-colors block"
            title={movie.title}
          >
            {movie.title}
          </Link>
          {movie.director && (
            <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
              Dir. {movie.director}
            </p>
          )}
        </div>

        {/* Recommendation Reason Pill */}
        {showExplanation && movie.explanation && (
          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-start gap-1.5 text-[11px] text-amber-300/90 leading-tight">
            <Sparkles className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{movie.explanation}</span>
          </div>
        )}
      </div>
    </div>
  );
}
