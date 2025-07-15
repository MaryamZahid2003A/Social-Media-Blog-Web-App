import { create } from 'zustand';
import axios from 'axios';

const useGlobalStore = create((set) => ({
  user: null,
  error: null,
  fetchUser: async () => {
    try {
      set({ loading: true });
      const res = await axios.get('http://localhost:5000/api/user/protected', {
        withCredentials: true,
      });
      set({ user: res.data.user});
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Auth failed',
        
      });
    }
  },
}));

export default useGlobalStore;
