import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Calendar, ShieldCheck, Bookmark, Star, Film, LogOut, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockStore } from '../lib/mockStore';
import { watchlistService } from '../services/watchlistService';

export default function ProfilePage() {
  const { user, profile, isAdmin, signOut } = useAuth();
  const [ratedMovies, setRatedMovies] = useState([]);
  const [watchlistCount, setWatchlistCount] = useState(0);

  useEffect(() => {
    if (user) {
      // Fetch user's ratings
      const allRatings = mockStore.getRatings();
      const userRatings = allRatings.filter((r) => r.user_id === user.id);
      const movies = mockStore.getMovies();
      const movieMap = new Map(movies.map((m) => [m.movie_id, m]));

      const populated = userRatings
        .map((r) => ({
          ...r,
          movie: movieMap.get(Number(r.movie_id)),
        }))
        .filter((r) => r.movie);

      setRatedMovies(populated);

      // Fetch watchlist count
      watchlistService.getUserWatchlist(user.id).then((items) => setWatchlistCount(items.length));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-4">
        <h2 className="text-xl font-bold text-white mb-2">Sign In Required</h2>
        <p className="text-xs text-neutral-400 mb-4">Please log in to view your user profile.</p>
        <Link
          to="/login"
          className="px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-bold"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#141622] border border-white/5 shadow-2xl mb-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-black font-black text-3xl sm:text-4xl flex items-center justify-center shadow-xl shadow-amber-500/20 shrink-0">
          {(profile?.username || user.email || 'U')[0].toUpperCase()}
        </div>

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
              {profile?.full_name || profile?.username || user.email?.split('@')[0]}
            </h1>
            {isAdmin && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Administrator
              </span>
            )}
          </div>

          <p className="text-xs font-mono text-neutral-400 flex items-center justify-center sm:justify-start gap-1.5">
            <Mail className="w-3.5 h-3.5" /> {user.email}
          </p>

          <p className="text-[11px] text-neutral-500">
            User ID: <code className="text-neutral-400">{user.id}</code>
          </p>
        </div>

        <button
          type="button"
          onClick={signOut}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-neutral-300 hover:text-rose-300 border border-white/10 text-xs font-semibold transition-colors flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" /> Sign Out
        </button>
      </div>

      {/* Stats Counter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="p-5 rounded-2xl bg-[#141622] border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
          <div>
            <span className="text-2xl font-black text-white">{ratedMovies.length}</span>
            <p className="text-xs text-neutral-400 font-medium">Movies Rated</p>
          </div>
        </div>

        <Link
          to="/watchlist"
          className="p-5 rounded-2xl bg-[#141622] border border-white/5 hover:border-amber-500/30 transition-all flex items-center gap-4 group"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Bookmark className="w-6 h-6 fill-cyan-400" />
          </div>
          <div>
            <span className="text-2xl font-black text-white">{watchlistCount}</span>
            <p className="text-xs text-neutral-400 font-medium group-hover:text-amber-300 transition-colors flex items-center gap-1">
              Watchlist Items <ArrowRight className="w-3 h-3" />
            </p>
          </div>
        </Link>

        <div className="p-5 rounded-2xl bg-[#141622] border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-white">Top 3</span>
            <p className="text-xs text-neutral-400 font-medium">Preferred Genres</p>
          </div>
        </div>
      </div>

      {/* User's Rating History Section */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          Your Rated Movies & Reviews
        </h2>

        {ratedMovies.length === 0 ? (
          <div className="p-8 rounded-2xl bg-[#141622] border border-white/5 text-center text-xs text-neutral-400">
            You haven't rated any movies yet. Explore the catalog and leave star ratings to train your recommendations!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ratedMovies.map((r) => (
              <div
                key={r.rating_id}
                className="p-4 rounded-xl bg-[#141622] border border-white/5 flex gap-4 items-start"
              >
                <Link
                  to={`/movie/${r.movie.movie_id}`}
                  className="w-16 h-24 rounded-lg overflow-hidden bg-neutral-900 shrink-0"
                >
                  <img
                    src={r.movie.poster_url}
                    alt={r.movie.title}
                    className="w-full h-full object-cover"
                  />
                </Link>
                <div className="flex-1 space-y-1">
                  <Link
                    to={`/movie/${r.movie.movie_id}`}
                    className="text-sm font-bold text-white hover:text-amber-400 transition-colors line-clamp-1"
                  >
                    {r.movie.title}
                  </Link>
                  <div className="flex items-center gap-1 text-xs text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < r.rating ? 'fill-amber-400' : 'text-neutral-700'
                        }`}
                      />
                    ))}
                    <span className="font-bold ml-1 text-white">{r.rating}/5</span>
                  </div>
                  {r.review && (
                    <p className="text-xs text-neutral-300 italic pt-1 line-clamp-2">
                      "{r.review}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
