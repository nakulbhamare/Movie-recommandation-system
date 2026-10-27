import React from 'react';
import { Film } from 'lucide-react';

export default function FallbackPoster({ title, year, className = '' }) {
  // Generate consistent subtle hue based on movie title hash
  const getGradient = (str = '') => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hues = [
      'from-slate-900 to-indigo-950',
      'from-neutral-900 to-zinc-950',
      'from-stone-900 to-amber-950',
      'from-gray-900 to-rose-950',
      'from-slate-900 to-cyan-950',
    ];
    return hues[Math.abs(hash) % hues.length];
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br ${getGradient(
        title
      )} border border-white/5 select-none relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-amber-400">
          <Film className="w-6 h-6 stroke-[1.5]" />
        </div>
        <p className="text-sm font-semibold text-white/90 line-clamp-2 px-2 leading-snug">
          {title}
        </p>
        {year && (
          <span className="text-xs text-white/50 mt-1 font-mono">
            ({year})
          </span>
        )}
      </div>
    </div>
  );
}
