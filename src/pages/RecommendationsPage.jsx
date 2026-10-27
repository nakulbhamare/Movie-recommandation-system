import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Cpu, Award, RefreshCw, Loader2, Info, ArrowRight } from 'lucide-react';
import { recommendationService } from '../services/recommendationService';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';

export default function RecommendationsPage() {
  const { user, loginAsDemoStudent } = useAuth();
  const [data, setData] = useState({ type: '', description: '', movies: [] });
  const [loading, setLoading] = useState(true);

  const fetchRecs = async () => {
    try {
      setLoading(true);
      const recs = await recommendationService.getRecommendations(user?.id);
      setData(recs);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecs();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
              Personalized Recommendations
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400">
            {data.description || 'Intelligent recommendations generated from live database ratings and genre affinities.'}
          </p>
        </div>

        <button
          onClick={fetchRecs}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 text-xs font-semibold transition-colors self-start md:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Recalculate
        </button>
      </div>

      {/* Algorithm Viva Explainer Banner */}
      <div className="mb-10 p-5 rounded-2xl bg-[#141622] border border-amber-500/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {data.type === 'content_based' ? 'Content-Based Filtering Active' : 'Popularity-Based Mode'}
              </span>
              <span className="text-xs text-neutral-400 font-mono">
                Method 1 & 2
              </span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              <strong className="text-white">Recommendation Formula: </strong>
              <code className="text-amber-300 bg-white/5 px-2 py-0.5 rounded font-mono">
                Score = (0.50 × GenreAffinity) + (0.30 × CommunityRating) + (0.20 × Popularity)
              </code>
            </p>
            <p className="text-[11px] text-neutral-400">
              Candidate movies are filtered to exclude titles you already rated, then ranked using weighted multi-criteria aggregation.
            </p>
          </div>

          {!user && (
            <div className="shrink-0 flex flex-col gap-2">
              <button
                type="button"
                onClick={loginAsDemoStudent}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-md shadow-amber-500/20"
              >
                Switch to Demo Student (Rated 25+ Movies)
              </button>
              <span className="text-[10px] text-neutral-400 text-center">
                Instantly shows personalized Sci-Fi & Action recommendations!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Recommended Movies Grid */}
      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-xs text-neutral-400">Computing recommendation rankings...</p>
        </div>
      ) : data.movies.length === 0 ? (
        <div className="py-20 text-center p-8 bg-[#141622] rounded-2xl border border-white/5 max-w-md mx-auto">
          <Info className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">No Recommendations Yet</h3>
          <p className="text-xs text-neutral-400 mt-1 mb-4">
            Rate a few movies with 4 or 5 stars to train the recommendation engine!
          </p>
          <Link
            to="/discover"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors"
          >
            Explore Movies to Rate <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {data.movies.map((movie) => (
            <MovieCard
              key={movie.movie_id}
              movie={movie}
              showExplanation={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
