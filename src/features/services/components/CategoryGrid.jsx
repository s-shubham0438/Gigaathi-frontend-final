import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Wrench,
  Zap,
  Hammer,
  Sparkles,
  Tv,
  Paintbrush,
  Flower2,
  Home,
  Scissors,
  GraduationCap,
  Truck,
  Users,
} from 'lucide-react';

import { useLanguage } from '../../../shared/hooks/useLanguage';

const ICON_MAP = {
  Wrench,
  Zap,
  Hammer,
  Sparkles,
  Tv,
  Paintbrush,
  Flower2,
  Home,
  Scissors,
  GraduationCap,
  Truck,
  Users,
};

export const CategoryGrid = ({
  categories = [],
  activeCategory,
  onSelectCategory,
}) => {
  const navigate = useNavigate();
  const { isHindi } = useLanguage();

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      navigate(`/services?category=${catId}`);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">

      {/* ALL WORKERS */}
      <button
        type="button"
        onClick={() => handleCategoryClick('all')}
        className={`flex flex-col items-center justify-center rounded-3xl p-4 text-center transition border cursor-pointer group ${
          activeCategory === 'all'
            ? 'border-indigo-600 bg-indigo-50/80 shadow-md ring-2 ring-indigo-500/20 dark:border-indigo-500 dark:bg-indigo-950/50'
            : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900'
        }`}
      >

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md mb-2.5 group-hover:scale-110 transition">

          <Users className="w-6 h-6" />

        </div>

        <span className="text-xs font-bold text-slate-900 dark:text-white">
          All Workers
        </span>

        <span className="text-[10px] font-medium text-slate-400 mt-0.5">
          Find nearby saathis
        </span>

      </button>

      {/* CATEGORIES */}
      {categories.map((cat) => {

        const IconComponent =
          ICON_MAP[cat.icon] || Wrench;

        const isSelected =
          activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() =>
              handleCategoryClick(cat.id)
            }
            className={`flex flex-col items-center justify-center rounded-3xl p-4 text-center transition border cursor-pointer group ${
              isSelected
                ? 'border-indigo-600 bg-indigo-50/80 shadow-md ring-2 ring-indigo-500/20 dark:border-indigo-500 dark:bg-indigo-950/50'
                : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
            }`}
          >

            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.color} text-white shadow-md transition group-hover:scale-110 mb-2.5`}
            >
              <IconComponent className="w-6 h-6" />
            </div>

            <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              {isHindi && cat.hindiName
                ? cat.hindiName
                : cat.name}
            </span>

            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 mt-0.5">
              {cat.count || 0} verified saathis
            </span>

          </button>
        );
      })}

    </div>
  );
};

export default CategoryGrid;
