
import axiosInstance from '../../../shared/lib/axiosInstance';
import { toBackendRole, toFrontendRole } from './roleMap';

const mapUser = (user) => ({
  ...user,
  id: user._id || user.id,
  role: toFrontendRole(user.role),
});

export const authApi = {
  login: async ({ email, password }) => {
    const { data } = await axiosInstance.post('/auth/login', {
      email,
      password,
    });

    return {
      user: mapUser(data.user),
    };
  },

  register: async ({
    name,
    email,
    phone,
    password,
    role,
    city,
    category,
    skills = [],
    experience = 0,
    hourlyRate = 500,
    description = '',
  }) => {
    const { data } = await axiosInstance.post('/auth/register', {
      name,
      email,
      phone,
      password,

      role: toBackendRole(role),

      // Customer / Worker common
      city,

      // Worker profile data
      category,
      skills,
      experience,
      hourlyRate,
      description,
    });

    return {
      user: mapUser(data.user),
    };
  },

  getCurrentUser: async () => {
    const { data } = await axiosInstance.get('/auth/me');

    return mapUser(data.user);
  },

  logout: async () => {
    await axiosInstance.post('/auth/logout');

    return {
      success: true,
    };
  },
};

export default authApi;

