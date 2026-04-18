import { create } from 'zustand';
import axios from '../lib/axios';

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  register: async (formData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post('/auth/register', formData);
      set({ user: data.user, loading: false });
      return { success: true };
    } catch (error) {
      set({ error: error.response?.data?.message, loading: false });
      return { success: false, message: error.response?.data?.message };
    }
  },

  login: async (formData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post('/auth/login', formData);
      set({ user: data.user, loading: false });
      return { success: true };
    } catch (error) {
      set({ error: error.response?.data?.message, loading: false });
      return { success: false, message: error.response?.data?.message };
    }
  },

  logout: async () => {
    try {
      await axios.post('/auth/logout');
      set({ user: null });
    } catch (error) {
      console.log(error);
    }
  },

  getMe: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get('/auth/me');
      set({ user: data.user, loading: false });
    } catch (error) {
      set({ user: null, loading: false });
    }
  }
}));

export default useAuthStore;