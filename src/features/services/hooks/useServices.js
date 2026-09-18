import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCategories,
  fetchServices,
  fetchServiceById,
  setActiveCategory,
  setSearchQuery,
  setSortBy,
  clearSelectedService,
} from '../state/serviceSlice';

export const useServices = (autoFetch = false) => {
  const dispatch = useDispatch();
  const {
    categories,
    services,
    selectedService,
    activeCategory,
    searchQuery,
    sortBy,
    status,
    error,
  } = useSelector((state) => state.services);

  useEffect(() => {
    if (autoFetch) {
      if (categories.length === 0) dispatch(fetchCategories());
      if (services.length === 0) dispatch(fetchServices());
    }
  }, [autoFetch, categories.length, services.length, dispatch]);

  const filteredServices = useMemo(() => {
    let result = [...services];

    if (activeCategory && activeCategory !== 'all') {
      result = result.filter((s) => s.categoryId === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.hindiTitle?.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [services, activeCategory, searchQuery, sortBy]);

  const emergencyServices = useMemo(() => {
    return services.filter((s) => s.isEmergencyAvailable);
  }, [services]);

  const popularServices = useMemo(() => {
    return [...services].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 6);
  }, [services]);

  return {
    categories,
    services: filteredServices,
    allServices: services,
    emergencyServices,
    popularServices,
    selectedService,
    activeCategory,
    searchQuery,
    sortBy,
    isLoading: status === 'loading',
    error,
    changeCategory: (catId) => dispatch(setActiveCategory(catId)),
    changeSearch: (query) => dispatch(setSearchQuery(query)),
    changeSort: (sort) => dispatch(setSortBy(sort)),
    loadServiceById: (id) => dispatch(fetchServiceById(id)),
    clearSelected: () => dispatch(clearSelectedService()),
    reloadServices: () => dispatch(fetchServices()),
  };
};

export default useServices;
