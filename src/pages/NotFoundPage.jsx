import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Home, Compass } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
        <Film className="w-8 h-8" />
      </div>
      <h1 className="text-6xl font-black text-white font-['Outfit'] mb-2">404</h1>
      <h2 className="text-xl font-bold text-neutral-200 mb-2">Page Not Found</h2>
      <p className="text-xs text-neutral-400 max-w-sm mb-8 leading-relaxed">
        The cinematic feature you are looking for has been moved or doesn't exist in the CineMatch database.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-lg shadow-amber-500/20"
        >
          <Home className="w-4 h-4" /> CineMatch Home
        </Link>
        <Link
          to="/discover"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
        >
          <Compass className="w-4 h-4" /> Discover Movies
        </Link>
      </div>
    </div>
  );
}
