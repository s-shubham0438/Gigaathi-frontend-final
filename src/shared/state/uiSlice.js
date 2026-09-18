import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  try {
    const stored = localStorage.getItem('gigsaathi_theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

const getInitialLanguage = () => {
  try {
    return localStorage.getItem('gigsaathi_lang') || 'en';
  } catch {
    return 'en';
  }
};

const initialState = {
  theme: getInitialTheme(),
  language: getInitialLanguage(), // 'en' | 'hi'
  isLowLiteracyMode: false, // Large buttons, speech cues, minimal clutter
  activeToast: null, // { message: string, type: 'success' | 'info' | 'error', id: number }
  emergencyModalOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('gigsaathi_theme', state.theme);
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setLanguage: (state, action) => {
      state.language = action.payload; // 'en' | 'hi'
      localStorage.setItem('gigsaathi_lang', action.payload);
    },
    toggleLanguage: (state) => {
      state.language = state.language === 'en' ? 'hi' : 'en';
      localStorage.setItem('gigsaathi_lang', state.language);
    },
    toggleLowLiteracyMode: (state) => {
      state.isLowLiteracyMode = !state.isLowLiteracyMode;
    },
    showToast: (state, action) => {
      state.activeToast = {
        id: Date.now(),
        message: action.payload.message || action.payload,
        type: action.payload.type || 'success',
      };
    },
    clearToast: (state) => {
      state.activeToast = null;
    },
    setEmergencyModal: (state, action) => {
      state.emergencyModalOpen = action.payload;
    },
  },
});

export const {
  toggleTheme,
  setLanguage,
  toggleLanguage,
  toggleLowLiteracyMode,
  showToast,
  clearToast,
  setEmergencyModal,
} = uiSlice.actions;

export default uiSlice.reducer;
