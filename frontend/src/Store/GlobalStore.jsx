// GlobalStore.js
import { create } from 'zustand';
import axios from 'axios';

const useGlobalStore = create((set) => ({
  user: null,
  error: null,
  loading: true, 
  fetchUser: async () => {
    try {
      set({ loading: true }); 
      const res = await axios.get('http://localhost:5000/api/user/protected', {
        withCredentials: true,
      });
      console.log("Global Store")
      console.log(res.data.user)
      set({ user: res.data.user, loading: false });
    } catch (error) {
      set({
        user: null,
        error: error.response?.data?.message || 'Auth failed',
        loading: false,
      });
    }
  },
   setUser: (newUser) => set({ user: newUser }),
}));

export default useGlobalStore;
