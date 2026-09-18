import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useServices } from '../../features/services/hooks/useServices';
import { useWorkers } from '../../features/workers/hooks/useWorkers';
import { useLanguage } from '../../shared/hooks/useLanguage';
import ServiceCard from '../../features/services/components/ServiceCard';

export const ServicesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const { t } = useLanguage();
  const { categories, services, allServices, activeCategory, changeCategory, changeSearch, changeSort } =
    useServices(true);
  const { workers } = useWorkers(true);

  const [search, setSearch] = useState(initialQuery);
  const [selectedCat, setSelectedCat] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('recommended');
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(4000);
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCat(initialCategory);
      changeCategory(initialCategory);
    }
    if (initialQuery) {
      setSearch(initialQuery);
      changeSearch(initialQuery);
    }
  }, [initialCategory, initialQuery]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    changeSearch(val);
  };

  const handleCategoryClick = (catId) => {
    setSelectedCat(catId);
    changeCategory(catId);
    setSearchParams(catId === 'all' ? {} : { category: catId });
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCat('all');
    setSortBy('recommended');
    setMinRating(0);
    setMaxPrice(4000);
    setEmergencyOnly(false);
    changeCategory('all');
    changeSearch('');
    changeSort('recommended');
    setSearchParams({});
  };

  // Filter pipeline
  const displayedServices = services.filter((s) => {
    const matchRating = s.rating >= minRating;
    const matchPrice = s.price <= maxPrice;
    const matchEmergency = !emergencyOnly || s.isEmergencyAvailable;
    return matchRating && matchPrice && matchEmergency;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Explore Cooperative Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Standard regulated prices with zero surge pricing and 100% background-verified professionals
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 max-w-md w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search services, repairs, cleaning..."
              className="w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs sm:text-sm font-medium text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 focus:outline-indigo-500 shadow-xs"
            />
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout (Sidebar + Results) */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)] gap-8">
        {/* Filter Sidebar */}
        <aside
          className={`${
            mobileFilterOpen ? 'block' : 'hidden'
          } md:block space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 h-fit`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filter Results
            </span>
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Clear All
            </button>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Category</label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => handleCategoryClick('all')}
                className={`w-full text-left text-xs font-semibold px-2.5 py-1.5 rounded-xl transition cursor-pointer ${
                  selectedCat === 'all'
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                }`}
              >
                All Categories ({allServices.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`w-full text-left text-xs font-semibold px-2.5 py-1.5 rounded-xl transition cursor-pointer flex items-center justify-between ${
                    selectedCat === cat.id
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="text-[10px] text-slate-400">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <span>Max Price:</span>
              <span className="text-indigo-600 dark:text-indigo-400">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="200"
              max="4000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Min Rating */}
          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Min Rating</label>
            <div className="grid grid-cols-4 gap-1">
              {[0, 4.5, 4.8, 4.9].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setMinRating(rate)}
                  className={`rounded-xl py-1 text-xs font-bold border transition ${
                    minRating === rate
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                      : 'border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {rate === 0 ? 'All' : `${rate}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Emergency 15m Filter */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={emergencyOnly}
                onChange={(e) => setEmergencyOnly(e.target.checked)}
                className="h-4 w-4 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                15m Emergency Only
              </span>
            </label>
          </div>
        </aside>

        {/* Results Area */}
        <div className="space-y-6">
          {/* Top Sort & Count Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-white p-3.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Showing <strong className="text-slate-900 dark:text-white">{displayedServices.length}</strong> available cooperative services
            </span>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  changeSort(e.target.value);
                }}
                className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <option value="recommended">Recommended (Cooperative Fair)</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Empty State */}
          {displayedServices.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800 space-y-3">
              <p className="text-base font-bold text-slate-700 dark:text-slate-300">
                No services found matching your filters.
              </p>
              <p className="text-xs text-slate-400">
                Try clearing search terms or widening your price/rating range.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            /* Services Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedServices.map((service) => {
                // Find a matching worker for card representation
                const matchingWorker = workers.find((w) => w.category === service.categoryId);
                return (
                  <ServiceCard key={service.id} service={service} worker={matchingWorker} />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
