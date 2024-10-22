import { create } from 'zustand';

const useAuthStore = create((set) => ({
  currentUser: null,
  loading: false,

  fetchCurrentUser: () => {
    set({ loading: true });
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      fetch(`${process.env.NEXT_PUBLIC_REST_API_URL}users/me`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          set({ currentUser: data, loading: false });
        })
        .catch((error) => {
          console.error('Failed to fetch user', error);
          set({ loading: false });
        });
    } else {
      set({ loading: false });
    }
  },

  setCurrentUser: (user) => set({ currentUser: user }),

  getToken: () => localStorage.getItem('jwt'),
}));

export default useAuthStore;
