import { create } from 'zustand';
import axios from 'axios';

const useGlobalStore = create((set) => ({
  user: null,
  error: null,
  loading: true,
  viewPost:false,
  setPost: (value) => set({ viewPost: value }),
  fetchUser: async () => {
      set((state) => {
        if (!state.loading) return state;
        return { loading: true };
      });

      try {
        const res = await axios.get('http://localhost:5000/api/user/protected', {
          withCredentials: true,
        });
         console.log("User fetched:", res.data.user)
        set((state) => {
          if (state.user?._id !== res.data.user?._id) {
            return { user: res.data.user, loading: false, error: null };
          }
          return { loading: false };
        });
      } catch (error) {
        set({
          user: null,
          error: error.response?.data?.message || 'Auth failed',
          loading: false,
        });
      }
    },

        setUser: (user) => set({ user }),
    }));

export default useGlobalStore;
