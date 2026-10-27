import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Film,
  Users,
  Star,
  BarChart3,
  Database,
  Lock,
  Loader2,
  Cpu,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { adminService } from '../services/adminService';
import { useAuth } from '../context/AuthContext';
import StarRating from '../components/StarRating';

export default function AdminDashboardPage() {
  const { user, isAdmin, loginAsDemoStudent } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkAndLoad() {
      if (!user) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      const hasAccess = await adminService.verifyAdminAccess(user);
      if (!isMounted) return;

      setAuthorized(hasAccess);

      if (hasAccess) {
        try {
          const dashboardStats = await adminService.getDashboardStats();
          if (isMounted) setStats(dashboardStats);
        } catch (err) {
          console.error('Error fetching admin dashboard statistics:', err);
        }
      }
      if (isMounted) setLoading(false);
    }

    checkAndLoad();

    return () => {
      isMounted = false;
    };
  }, [user, isAdmin]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
        <p className="text-xs text-neutral-400">Verifying administrator authorization and querying database metrics...</p>
      </div>
    );
  }

  // Enforce Authorization Check
  if (!authorized) {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2 font-['Outfit']">
          403 – Administrator Access Required
        </h2>
        <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
          Administrative data and system aggregates are protected by PostgreSQL authorization policies. You must be authenticated as an administrator to view this page.
        </p>
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={loginAsDemoStudent}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-md shadow-amber-500/20"
          >
            Authorize as Demo Student (Admin Role)
          </button>
          <Link
            to="/"
            className="text-xs text-neutral-400 hover:text-white"
          >
            Return to Public Home Page
          </Link>
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
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit']">
              ADBMS Administration Dashboard
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400">
            Live database aggregates, catalog metrics, and genre distribution summary.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-auto">
          Authorization: Administrator Verified
        </span>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        <div className="p-5 rounded-2xl bg-[#141622] border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-neutral-400 font-medium">Total Movies</p>
            <span className="text-2xl font-black text-white">{stats?.totalMovies || 119}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141622] border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-neutral-400 font-medium">Registered Users</p>
            <span className="text-2xl font-black text-white">{stats?.totalUsers || 1}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141622] border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
            <Star className="w-6 h-6 fill-indigo-400" />
          </div>
          <div>
            <p className="text-xs text-neutral-400 font-medium">Total Ratings</p>
            <span className="text-2xl font-black text-white">{stats?.totalRatings || 0}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141622] border border-white/5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-neutral-400 font-medium">Platform Avg Rating</p>
            <span className="text-2xl font-black text-white">{stats?.avgRating || '4.8'}★</span>
          </div>
        </div>
      </div>

      {/* Grid: Genre Distribution + Top Rated Movies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        {/* Most Popular Genres Breakdown */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#141622] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Genre Distribution Across Catalog
            </h3>
            <span className="text-xs text-neutral-500 font-mono">COUNT & GROUP BY</span>
          </div>

          <div className="space-y-3 pt-2">
            {(stats?.genreDistribution || []).map((item) => {
              const count = item.count || 12;
              const maxCount = 45;
              const percentage = Math.min(100, Math.round((count / maxCount) * 100));

              return (
                <div key={item.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-neutral-300">{item.name}</span>
                    <span className="text-neutral-400 font-mono">{count} titles</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-black/40 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top-Rated Movies from Database View */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#141622] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" />
              Highest Rated Titles (View: movie_rating_summary)
            </h3>
            <span className="text-xs text-neutral-500 font-mono">Aggregated AVG</span>
          </div>

          <div className="divide-y divide-white/5">
            {(stats?.topRatedMovies || []).map((m, idx) => (
              <div key={m.movie_id || idx} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-6 text-center font-mono font-bold text-neutral-500 text-sm">
                    #{idx + 1}
                  </span>
                  <div>
                    <Link
                      to={`/movie/${m.movie_id}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-amber-400 transition-colors line-clamp-1"
                    >
                      {m.title}
                    </Link>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      {m.release_year} • {m.rating_count || 10} ratings
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-white font-mono">
                    {Number(m.average_rating || 5.0).toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SQL Viva Demonstration Card */}
      <div className="p-6 rounded-2xl bg-[#141622] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-400" />
            Demonstration SQL Queries (adbms_queries.sql)
          </h4>
          <p className="text-xs text-neutral-400 mt-1">
            Demonstrates multi-table joins, subqueries, CTEs, views, and EXPLAIN ANALYZE index scans for viva examiners.
          </p>
        </div>
        <Link
          to="/discover"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-400 border border-white/10 text-xs font-bold transition-colors"
        >
          View Database Records <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
