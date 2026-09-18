import axios from 'axios';

export const chatbotAxios = axios.create({
  baseURL: import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:8000/api',
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

chatbotAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || error.message || 'An unexpected error occurred';
    const customError = new Error(message);
    customError.response = error.response;
    customError.status = error.response?.status;
    return Promise.reject(customError);
  }
);

export default chatbotAxios;