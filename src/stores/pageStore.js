import { create } from "zustand";
import qs from "qs";
import axiosClient from "@/app/api/GlobalApi";

const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL;

const buildPagesUrl = (count) => {
  return (
    `pages?` +
    qs.stringify({
      fields: [
        "id",
        "slug",
        "title",
        "content",
      ],
      pagination: { pageSize: count || 9999 },
      sort: ["id:asc"],
    })
  );
};

const usePageStore = create((set) => ({
  pages: [],
  slugs: [],
  loading: false,
  error: null,
  singlePage: {},

  fetchPages: async (count) => {
    set({ loading: true, error: null });
    try {
      const url = buildPagesUrl(count);
      const response = await axiosClient.get(url);

      const pages = response.data.data.map((page) => {
        /*const imageUrl = page.image?.url;
        const mobileImageUrl = page.mobile_image?.url;

        if (imageUrl) {
          page.image.url = `${cmsUrl}${imageUrl}`;
        }
        if (mobileImageUrl) {
          page.mobile_image.url = `${cmsUrl}${mobileImageUrl}`;
        }*/
        return {
          id: page.id,
          slug: page.slug,
          title: page.title,
          content: page.content,
        }; // Вибираємо лише необхідні дані
      });

      set({ pages, loading: false });
    } catch (error) {
      console.error(
        "Error fetching pages:",
        error.response?.data || error.message
      );
      set({ error: error.message, loading: false });
    }
  },

  fetchSlugs: async (count) => {
    set({ loading: true, error: null });
    try {
      const url = buildPagesUrl(count);
      const response = await axiosClient.get(url);

      const slugs = response.data.data.map((page) => page.slug);

      set({ slugs, loading: false });
    } catch (error) {
      console.error(
        "Error fetching slugs:",
        error.response?.data || error.message
      );
      set({ error: error.message, loading: false });
    }
  },

  fetchPageBySlug: async (slug) => {
    set({ loading: true, error: null });
    try {
      const url = buildPagesUrl(999); // Обмежуємо кількість постів
      const response = await axiosClient.get(url);

      const page = response.data.data.find((page) => page.slug === slug);

      if (page) {
        /*const imageUrl = page.image?.url;
        const mobileImageUrl = page.mobile_image?.url;

        if (imageUrl) {
          page.image.url = `${cmsUrl}${imageUrl}`;
        }
        if (mobileImageUrl) {
          page.mobile_image.url = `${cmsUrl}${mobileImageUrl}`;
        }*/

        const processedPage = {
          id: page.id,
          slug: page.slug,
          title: page.title,
          content: page.content,
          image: page.image,
          mobile_image: page.mobile_image,
          seo_title: page.seo_title,
          seo_description: page.seo_description,
        }; // Вибираємо тільки необхідні поля

        set({ singlePage: processedPage, loading: false });
      } else {
        set({ singlePage: {}, loading: false });
        console.error("Page not found.");
      }
    } catch (error) {
      console.error(
        "Error fetching page:",
        error.response?.data || error.message
      );
      set({ error: error.message, loading: false });
    }
  },
}));

export default usePageStore;
