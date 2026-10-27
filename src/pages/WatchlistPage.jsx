import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ArrowRight, Loader2, Film, Lock } from 'lucide-react';
import { watchlistService } from '../services/watchlistService';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';

export default function WatchlistPage() {
  const { user, loginAsDemoStudent } = useAuth();
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWatchlist = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const items = await watchlistService.getUserWatchlist(user.id);
      setWatchlistItems(items);
    } catch (err) {
      console.error('Error fetching watchlist:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, [user]);

  const handleRemove = async (movieId) => {
    if (!user) return;
    try {
      await watchlistService.removeFromWatchlist(user.id, movieId);
      setWatchlistItems((prev) => prev.filter((item) => Number(item.movie.movie_id) !== Number(movieId)));
    } catch (err) {
      console.error('Failed to remove from watchlist:', err);
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 font-['Outfit']">
          Watchlist is Private
        </h2>
        <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
          PostgreSQL Row Level Security (RLS) ensures each user's watchlist is strictly confidential. Please sign in to view your saved movies.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/login"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors"
          >
            Sign In with Account
          </Link>
          <button
            type="button"
            onClick={loginAsDemoStudent}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
          >
            Open Demo Student Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Bookmark className="w-5 h-5 fill-amber-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
              My Watchlist
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400">
            {watchlistItems.length} {watchlistItems.length === 1 ? 'movie' : 'movies'} saved to your private database collection.
          </p>
        </div>

        <Link
          to="/discover"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors self-start sm:self-auto"
        >
          Add More Movies <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-xs text-neutral-400">Loading your watchlist from PostgreSQL...</p>
        </div>
      ) : watchlistItems.length === 0 ? (
        <div className="py-24 text-center p-8 bg-[#141622] rounded-2xl border border-white/5 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 mx-auto mb-4">
            <Film className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">Your Watchlist is Empty</h3>
          <p className="text-xs text-neutral-400 mb-6">
            Explore movies in the catalog and click the bookmark icon to save titles you plan to watch.
          </p>
          <Link
            to="/discover"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-lg shadow-amber-500/20"
          >
            Explore Movies Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {watchlistItems.map((item) => (
            <div key={item.watchlist_id} className="relative group">
              <MovieCard
                movie={item.movie}
                isInWatchlist={true}
                onWatchlistToggle={(mid, inList) => {
                  if (!inList) handleRemove(mid);
                }}
              />
              <button
                type="button"
                onClick={() => handleRemove(item.movie.movie_id)}
                title="Remove from Watchlist"
                className="absolute bottom-4 right-4 z-20 p-2 rounded-lg bg-black/80 hover:bg-rose-600 text-neutral-400 hover:text-white border border-white/10 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
