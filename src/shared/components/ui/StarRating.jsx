import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating = 5, max = 5, onRate, interactive = false, size = 'sm' }) => {
  const starSize = size === 'lg' ? 'w-6 h-6' : size === 'md' ? 'w-5 h-5' : 'w-4 h-4';

  return (
    <div className="inline-flex items-center gap-1" role={interactive ? 'radiogroup' : 'img'} aria-label={`Rating: ${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= Math.round(rating);

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onRate && onRate(starValue)}
            className={`transition ${interactive ? 'cursor-pointer hover:scale-110 p-0.5' : 'cursor-default'}`}
          >
            <Star
              className={`${starSize} ${
                isFilled
                  ? 'fill-amber-400 text-amber-400 dark:fill-amber-400'
                  : 'text-slate-300 dark:text-slate-600'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
