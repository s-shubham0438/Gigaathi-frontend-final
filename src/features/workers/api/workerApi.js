
import axiosInstance from '../../../shared/lib/axiosInstance';

const mapWorker = (p) => ({
  id: p._id,

  userId: p.user?._id,

  name: p.user?.name || 'Unknown Worker',

  avatar:
    p.user?.profileImage ||
    'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=200&auto=format&fit=crop&q=80',

  phone: p.user?.phone || '',

  email: p.user?.email || '',

  category: p.category || 'other',

  cooperativeName: 'gigSaathi Worker Network',

  rating: Number(p.rating || 0),

  reviewsCount: Number(p.reviewsCount || 0),

  completedJobs: Number(p.completedJobs || 0),

  distanceKm: 0,

  responseTimeMinutes: 15,

  skills: p.skills || [],

  hourlyRate: Number(p.hourlyRate || 0),

  location: p.location || '',

  experience: Number(p.experience || 0),

  experienceYears: Number(p.experience || 0),

  description: p.description || '',

  about:
    p.description ||
    `${p.category || 'Service'} professional available for local work.`,

  isAvailableToday: Boolean(p.isAvailable),

  isAvailable: Boolean(p.isAvailable),

  verificationBadge: 'Verified Saathi',

  completionRate: 100,

  languages: ['Hindi', 'English'],
});

export const workerApi = {
  // ---------------------------------------------------
  // GET ALL WORKERS
  // ---------------------------------------------------
  getWorkers: async (params = {}) => {
    const queryParams = {};

    if (params.category && params.category !== 'all') {
      queryParams.category = params.category;
    }

    if (params.location) {
      queryParams.location = params.location;
    }

    if (params.available !== undefined) {
      queryParams.available = params.available;
    }

    const { data } = await axiosInstance.get('/professionals', {
      params: queryParams,
    });

    return (data.professionals || []).map(mapWorker);
  },

  // ---------------------------------------------------
  // GET SINGLE WORKER
  // ---------------------------------------------------
  getWorkerById: async (id) => {
    const { data } = await axiosInstance.get(`/professionals/${id}`);

    return mapWorker(data.professional);
  },

  // ---------------------------------------------------
  // CREATE PROFILE
  // Mostly kept for future profile editing/setup.
  // Registration now creates profile automatically.
  // ---------------------------------------------------
  createProfile: async ({
    category,
    location,
    skills = [],
    experience = 0,
    hourlyRate = 500,
    description = '',
  }) => {
    const { data } = await axiosInstance.post('/professionals', {
      category,
      location,
      skills,
      experience,
      hourlyRate,
      description,
    });

    return mapWorker(data.profile);
  },

  // ---------------------------------------------------
  // UPDATE PROFILE
  // ---------------------------------------------------
  updateProfile: async (profileData) => {
    const { data } = await axiosInstance.put(
      '/professionals',
      profileData
    );

    return mapWorker(data.profile);
  },
};

export default workerApi;

