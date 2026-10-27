import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  Bookmark,
  Calendar,
  Clock,
  User,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { movieService } from '../services/movieService';
import { ratingService } from '../services/ratingService';
import { watchlistService } from '../services/watchlistService';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';
import MovieCard from '../components/MovieCard';
import FallbackPoster from '../components/FallbackPoster';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const { user, profile } = useAuth();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);

  // User Rating Form State
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [hasRatedBefore, setHasRatedBefore] = useState(false);
  const [submittingRating, setSubmittingRating] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState(null);
  const [togglingWatchlist, setTogglingWatchlist] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadMovieDetails() {
      try {
        setLoading(true);
        setSubmitFeedback(null);
        setImageFailed(false);

        const movieData = await movieService.getMovieById(id);
        if (!isMounted || !movieData) {
          setMovie(null);
          return;
        }

        setMovie(movieData);

        // Fetch ratings & reviews for this movie
        const movieReviews = await ratingService.getRatingsForMovie(id);
        if (isMounted) setReviews(movieReviews);

        // Fetch similar movies based on genres
        const genreIds = (movieData.genres || []).map((g) => g.genre_id);
        const similar = await movieService.getSimilarMovies(id, genreIds, 6);
        if (isMounted) setSimilarMovies(similar);

        // Check if user is logged in
        if (user) {
          // Check watchlist
          const saved = await watchlistService.isInWatchlist(user.id, id);
          if (isMounted) setInWatchlist(saved);

          // Check if user has already rated this movie
          const existingRating = await ratingService.getUserRating(user.id, id);
          if (isMounted && existingRating) {
            setUserRating(existingRating.rating);
            setUserReview(existingRating.review || '');
            setHasRatedBefore(true);
          } else if (isMounted) {
            setUserRating(0);
            setUserReview('');
            setHasRatedBefore(false);
          }
        }
      } catch (err) {
        console.error('Error loading movie details:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadMovieDetails();

    return () => {
      isMounted = false;
    };
  }, [id, user]);

  const handleWatchlistToggle = async () => {
    if (!user) {
      alert('Please sign in or switch to the Demo Student profile to manage your watchlist.');
      return;
    }
    setTogglingWatchlist(true);
    try {
      if (inWatchlist) {
        await watchlistService.removeFromWatchlist(user.id, id);
        setInWatchlist(false);
      } else {
        await watchlistService.addToWatchlist(user.id, id);
        setInWatchlist(true);
      }
    } finally {
      setTogglingWatchlist(false);
    }
  };

  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please sign in or switch to the Demo Student profile to submit a rating.');
      return;
    }

    if (userRating < 1 || userRating > 5) {
      alert('Please select a star rating from 1 to 5.');
      return;
    }

    setSubmittingRating(true);
    setSubmitFeedback(null);

    try {
      await ratingService.submitRating({
        userId: user.id,
        movieId: id,
        rating: userRating,
        review: userReview,
        username: profile?.username || user.email?.split('@')[0] || 'User',
      });

      setHasRatedBefore(true);
      setSubmitFeedback('Your rating and review have been saved to the database!');

      // Refresh reviews list and movie data
      const updatedReviews = await ratingService.getRatingsForMovie(id);
      setReviews(updatedReviews);

      const refreshedMovie = await movieService.getMovieById(id);
      if (refreshedMovie) setMovie(refreshedMovie);
    } catch (err) {
      console.error('Rating submission failed:', err);
      alert('Failed to submit rating: ' + err.message);
    } finally {
      setSubmittingRating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
        <p className="text-xs text-neutral-400">Loading movie details from database...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="max-w-xl mx-auto py-24 text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-2">Movie Not Found</h2>
        <p className="text-neutral-400 text-xs mb-6">
          The requested movie record does not exist in the database.
        </p>
        <Link
          to="/discover"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Discover
        </Link>
      </div>
    );
  }

  const ratingAvg = Number(movie.average_rating || 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/discover"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Discover Catalog
        </Link>
      </div>

      {/* Main Details Hero Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">
        {/* Poster Column */}
        <div className="md:col-span-4 lg:col-span-3">
          <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-900">
            {!imageFailed && movie.poster_url ? (
              <img
                src={movie.poster_url}
                alt={movie.title}
                onError={() => setImageFailed(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <FallbackPoster title={movie.title} year={movie.release_year} />
            )}
          </div>

          {/* Watchlist Action */}
          <button
            type="button"
            onClick={handleWatchlistToggle}
            disabled={togglingWatchlist}
            className={`w-full mt-4 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-lg ${
              inWatchlist
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${inWatchlist ? 'fill-current' : ''}`} />
            {inWatchlist ? 'Saved in My Watchlist' : 'Add to My Watchlist'}
          </button>
        </div>

        {/* Info Column */}
        <div className="md:col-span-8 lg:col-span-9 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {(movie.genres || []).map((g) => (
                <span
                  key={g.genre_id || g.genre_name}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20"
                >
                  {g.genre_name}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-['Outfit']">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400 mt-2 font-mono">
              <span className="flex items-center gap-1 text-neutral-300">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                {movie.release_year}
              </span>
              <span className="flex items-center gap-1 text-neutral-300">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                {movie.duration_mins || 120} minutes
              </span>
              {movie.director && (
                <span className="text-neutral-300">
                  Director: <strong className="text-white font-sans">{movie.director}</strong>
                </span>
              )}
            </div>
          </div>

          {/* Rating Summary Card (From PostgreSQL View) */}
          <div className="p-4 rounded-xl bg-[#141622] border border-white/5 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Star className="w-6 h-6 fill-amber-400" />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-white">
                    {ratingAvg > 0 ? ratingAvg.toFixed(1) : 'NR'}
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">/ 5.0</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  {movie.rating_count || reviews.length} community ratings
                </p>
              </div>
            </div>

            <div className="border-l border-white/5 pl-6 hidden sm:block">
              <span className="text-xs font-medium text-neutral-400 block mb-1">
                Community Score
              </span>
              <StarRating rating={ratingAvg} size="md" />
            </div>

            <div className="border-l border-white/5 pl-6 hidden lg:block">
              <span className="text-xs font-medium text-neutral-400 block mb-1">
                Popularity Index
              </span>
              <span className="text-sm font-bold text-cyan-400 font-mono">
                {movie.popularity || 85.0} / 100
              </span>
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-300 mb-2">
              Synopsis
            </h3>
            <p className="text-neutral-300 text-sm leading-relaxed max-w-3xl">
              {movie.description}
            </p>
          </div>

          {/* Rating Submission / Update Form */}
          <div className="p-5 rounded-2xl bg-[#141622] border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  {hasRatedBefore ? 'Update Your Rating & Review' : 'Rate This Movie'}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Your ratings directly personalize your CineMatch recommendations.
                </p>
              </div>
              {hasRatedBefore && (
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Previously Rated
                </span>
              )}
            </div>

            {submitFeedback && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{submitFeedback}</span>
              </div>
            )}

            <form onSubmit={handleRatingSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Select Your Rating (1 to 5 Stars):
                </label>
                <StarRating
                  rating={userRating}
                  interactive={true}
                  onChange={setUserRating}
                  size="lg"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Optional Review / Thoughts:
                </label>
                <textarea
                  rows={2}
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  placeholder="What did you think of the direction, cinematography, or plot?"
                  className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-neutral-500">
                  {user ? `Posting as ${profile?.username || user.email}` : 'Sign in to submit a rating'}
                </span>

                <button
                  type="submit"
                  disabled={submittingRating || userRating === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold transition-all shadow-md shadow-amber-500/20"
                >
                  {submittingRating ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  {hasRatedBefore ? 'Update Rating' : 'Submit Rating'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Community Reviews Section */}
      <section className="mb-16">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <span>Community Reviews & Ratings</span>
          <span className="text-xs font-normal text-neutral-400 font-mono">
            ({reviews.length})
          </span>
        </h2>

        {reviews.length === 0 ? (
          <div className="p-6 rounded-xl bg-[#141622] border border-white/5 text-center text-xs text-neutral-400">
            No reviews yet. Be the first to share your thoughts on {movie.title}!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r, idx) => (
              <div
                key={r.rating_id || idx}
                className="p-4 rounded-xl bg-[#141622] border border-white/5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-amber-300">
                      {(r.username || 'U')[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {r.username || 'Verified Reviewer'}
                      </p>
                      <span className="text-[10px] text-neutral-500">
                        {new Date(r.created_at || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <StarRating rating={r.rating} size="sm" showValue={true} />
                </div>
                {r.review && (
                  <p className="text-xs text-neutral-300 italic pt-1 leading-relaxed">
                    "{r.review}"
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Similar Movies Section */}
      {similarMovies.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-white mb-6">
            Similar Movies You Might Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {similarMovies.map((sim) => (
              <MovieCard key={sim.movie_id} movie={sim} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
