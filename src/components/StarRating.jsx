import React, { useState } from 'react';
import { Star } from 'lucide-react';

const RATING_LABELS = {
  1: '1 Star – Poor',
  2: '2 Stars – Fair',
  3: '3 Stars – Good',
  4: '4 Stars – Very Good',
  5: '5 Stars – Masterpiece',
};

export default function StarRating({
  rating = 0,
  max = 5,
  interactive = false,
  onChange = () => {},
  size = 'md',
  showValue = false,
  count = null,
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  const activeScore = interactive ? (hoverRating || rating) : rating;

  return (
    <div className="inline-flex items-center gap-1.5">
      <div
        className="flex items-center"
        onMouseLeave={() => interactive && setHoverRating(0)}
      >
        {[...Array(max)].map((_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= activeScore;
          const isHalf = !isFilled && starNumber - 0.5 <= activeScore;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onChange(starNumber)}
              onMouseEnter={() => interactive && setHoverRating(starNumber)}
              className={`${
                interactive
                  ? 'cursor-pointer transition-transform hover:scale-125 focus:outline-none p-0.5'
                  : 'cursor-default pointer-events-none'
              }`}
              title={interactive ? RATING_LABELS[starNumber] : undefined}
            >
              <Star
                className={`${sizeClasses[size] || sizeClasses.md} transition-colors ${
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : isHalf
                    ? 'fill-amber-400/50 text-amber-400'
                    : 'fill-transparent text-neutral-600'
                }`}
              />
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className="text-xs font-semibold text-amber-400 ml-1">
          {rating ? Number(rating).toFixed(1) : 'Unrated'}
        </span>
      )}

      {count !== null && (
        <span className="text-xs text-neutral-400">
          ({count} {count === 1 ? 'rating' : 'ratings'})
        </span>
      )}

      {interactive && hoverRating > 0 && (
        <span className="text-xs font-medium text-amber-300 ml-2 animate-fade-in">
          {RATING_LABELS[hoverRating]}
        </span>
      )}
    </div>
  );
}
