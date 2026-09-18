import axiosInstance from '../../../shared/lib/axiosInstance';
import { mockCategories } from '../../../mocks/data/categories';

// Category metadata (icons/colors) has no backend model — kept static for now,
// per our earlier call that categories are just UI labels, not core data.
const categoryLabel = (categoryId) => {
  const match = mockCategories.find((c) => c.id === categoryId);
  return match ? match.name : categoryId;
};

const mapService = (s) => ({
  id: s._id,
  title: s.name,
  hindiTitle: undefined,
  categoryId: s.category,
  category: categoryLabel(s.category),
  image: s.image || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=80',
  price: s.startingPrice || 0,
  unit: 'visit',
  description: s.description || '',
  rating: 0,
  reviewsCount: 0,
  isEmergencyAvailable: false,
});

export const serviceApi = {
  getCategories: async () => mockCategories,

  getServices: async () => {
    const { data } = await axiosInstance.get('/services');
    return (data.services || []).map(mapService);
  },

  getServiceById: async (id) => {
    const { data } = await axiosInstance.get(`/services/${id}`);
    return mapService(data.service);
  },

  getEmergencyServices: async () => {
    // No emergency flag on the backend model yet.
    return [];
  },
};

export default serviceApi;