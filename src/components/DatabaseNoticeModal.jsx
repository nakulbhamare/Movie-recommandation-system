import React from 'react';
import { X, Database, CheckCircle2, AlertTriangle, ShieldCheck, Layers, Cpu, Copy, Check } from 'lucide-react';
import { isSupabaseConfigured, getSupabaseConfig } from '../lib/supabase';

export default function DatabaseNoticeModal({ isOpen, onClose }) {
  const [copied, setCopied] = React.useState(false);
  const config = getSupabaseConfig();

  if (!isOpen) return null;

  const copyEnvSnippet = () => {
    navigator.clipboard.writeText(
      `VITE_SUPABASE_URL=https://your-project.supabase.co\nVITE_SUPABASE_ANON_KEY=your-anon-key`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#12141f] border border-white/10 rounded-2xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">ADBMS Database Architecture</h3>
              <p className="text-xs text-neutral-400">PostgreSQL / Supabase Schema & Mini-Project Specs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Connection Status */}
        <div className="my-5 p-4 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
          {isSupabaseConfigured ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-emerald-300">Live PostgreSQL Connected</p>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Connected to Supabase Project: <code className="text-white bg-white/5 px-1.5 py-0.5 rounded">{config.url}</code>
                </p>
              </div>
            </>
          ) : (
            <>
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-300">
                  Active in Demo Mode (119 Pre-Seeded Movies)
                </p>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  The application is running with full interactive ratings, watchlists, recommendations, and admin stats.
                  To connect your personal live Supabase PostgreSQL database, configure <code className="text-amber-300 bg-white/5 px-1.5 py-0.5 rounded">.env</code> with your Supabase URL & Anon Key.
                </p>
              </div>
            </>
          )}
        </div>

        {/* 7 Core Tables Breakdown */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-400" /> 7 Normalized Relational Tables (3NF)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="font-semibold text-amber-300">1. user_profiles</span>
              <p className="text-neutral-400 mt-0.5">user_id (PK, FK auth.users), username, is_admin</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="font-semibold text-amber-300">2. movies</span>
              <p className="text-neutral-400 mt-0.5">movie_id (PK), title, year, popularity, poster_url</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="font-semibold text-amber-300">3. genres</span>
              <p className="text-neutral-400 mt-0.5">genre_id (PK), genre_name (UNIQUE)</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="font-semibold text-amber-300">4. movie_genres (Junction)</span>
              <p className="text-neutral-400 mt-0.5">M:N relationship (movie_id, genre_id PK/FKs)</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="font-semibold text-amber-300">5. ratings</span>
              <p className="text-neutral-400 mt-0.5">1-5 stars + review, UNIQUE(user_id, movie_id)</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="font-semibold text-amber-300">6. watchlists</span>
              <p className="text-neutral-400 mt-0.5">user_id, movie_id, added_at timestamp</p>
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 sm:col-span-2">
              <span className="font-semibold text-amber-300">7. user_preferences</span>
              <p className="text-neutral-400 mt-0.5">user_id, genre_id, preference_score for recommendations</p>
            </div>
          </div>
        </div>

        {/* ADBMS Key Highlights */}
        <div className="mt-5 p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-neutral-300">
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
            <span><strong className="text-white">Database View:</strong> <code className="text-cyan-300">movie_rating_summary</code> aggregates live averages via LEFT JOIN.</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong className="text-white">Security:</strong> PostgreSQL Row Level Security (RLS) restricts ratings and private watchlists.</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-300">
            <Database className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong className="text-white">Viva SQL File:</strong> Available in root as <code className="text-amber-300">adbms_queries.sql</code>.</span>
          </div>
        </div>

        {/* Setup Quick Action */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={copyEnvSnippet}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-medium border border-white/10 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied Env Format' : 'Copy .env Format'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
