import { create } from 'zustand'; // Use named import for `create`
import qs from 'qs';
import axiosClient from '@/app/api/GlobalApi';

// Create Zustand store
const useProductStore = create((set, get) => ({
  products: [],
  fetchProducts: async () => {
    try {
      const response = await axiosClient.get(
        `products?` +
          qs.stringify({
            fields: ['id', 'slug', 'title', 'description', 'price', 'category'],
            pagination: { pageSize: 9999 },
          })
      );
      set({ products: response.data.data });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
  getProductByCategory: (category) => {
    return get().products.filter(
      (product) => product.category === category
    );
  },
  getProductBySlug: (slug) => {
    return get().products.find((product) => product.attributes.slug === slug);
  },
}));

export default useProductStore;
