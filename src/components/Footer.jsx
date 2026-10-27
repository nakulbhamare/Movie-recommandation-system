import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Film, Database, ShieldCheck, Cpu, Code2, Heart } from 'lucide-react';
import DatabaseNoticeModal from './DatabaseNoticeModal';

export default function Footer() {
  const [dbModalOpen, setDbModalOpen] = useState(false);

  return (
    <>
      <footer className="mt-20 border-t border-white/5 bg-[#0e1017] text-neutral-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* CineMatch Brand */}
            <div className="md:col-span-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-yellow-400 p-0.5 flex items-center justify-center">
                  <div className="w-full h-full bg-[#0d0f15] rounded-[6px] flex items-center justify-center">
                    <Film className="w-4 h-4 text-amber-400" />
                  </div>
                </div>
                <span className="text-lg font-black tracking-tight text-white font-['Outfit']">
                  CINE<span className="text-amber-400">MATCH</span>
                </span>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Discover Your Next Favorite Movie. An undergraduate Advanced Database Management System (ADBMS) mini-project.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  PostgreSQL
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Supabase
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  React + Vite
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-amber-400 transition-colors">Home Page</Link>
                </li>
                <li>
                  <Link to="/discover" className="hover:text-amber-400 transition-colors">Discover Catalog</Link>
                </li>
                <li>
                  <Link to="/recommendations" className="hover:text-amber-400 transition-colors">Recommendations Engine</Link>
                </li>
                <li>
                  <Link to="/watchlist" className="hover:text-amber-400 transition-colors">My Watchlist</Link>
                </li>
              </ul>
            </div>

            {/* ADBMS Mini-Project Concepts */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">ADBMS Concepts</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>3NF Normalization & Junction Tables</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-amber-400" />
                  <span>View: <code className="text-amber-300">movie_rating_summary</code></span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PostgreSQL Row Level Security (RLS)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>EXPLAIN ANALYZE B-tree Indexes</span>
                </li>
              </ul>
            </div>

            {/* Viva Resources */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Viva Demonstration</h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                Inspect SQL queries, schema, and database execution plans for college viva presentation.
              </p>
              <button
                onClick={() => setDbModalOpen(true)}
                className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 border border-white/10 font-medium text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Database className="w-3.5 h-3.5 text-amber-400" />
                Inspect Database Schema
              </button>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <p>© {new Date().getFullYear()} CineMatch. Built for College ADBMS Mini-Project.</p>
            <p className="flex items-center gap-1">
              Developed with <Heart className="w-3 h-3 text-rose-500 fill-current" /> using React, Tailwind & PostgreSQL
            </p>
          </div>
        </div>
      </footer>

      <DatabaseNoticeModal isOpen={dbModalOpen} onClose={() => setDbModalOpen(false)} />
    </>
  );
}
