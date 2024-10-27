import { create } from "zustand";
import qs from "qs";
import axiosClient from "@/app/api/GlobalApi";

const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL;

const buildPostsUrl = (count) => {
  return (
    `posts?` +
    qs.stringify({
      fields: [
        "id",
        "slug",
        "title",
        "excerpt",
        "content",
        "seo_title",
        "seo_description",
      ],
      populate: {
        image: { fields: ["url"] },
        mobile_image: { fields: ["url"] },
      },
      pagination: { pageSize: count || 9999 },
      sort: ["id:asc"],
    })
  );
};

const usePostStore = create((set) => ({
  posts: [],
  slugs: [],
  loading: false,
  error: null,
  singlePost: {},

  fetchPosts: async (count) => {
    set({ loading: true, error: null });
    try {
      const url = buildPostsUrl(count);
      const response = await axiosClient.get(url);

      const posts = response.data.data.map((post) => {
        /*const imageUrl = post.image?.url;
        const mobileImageUrl = post.mobile_image?.url;

        if (imageUrl) {
          post.image.url = `${cmsUrl}${imageUrl}`;
        }
        if (mobileImageUrl) {
          post.mobile_image.url = `${cmsUrl}${mobileImageUrl}`;
        }*/
        return {
          id: post.id,
          slug: post.slug,
          title: post.title,
          content: post.content,
          image: post.image,
          mobile_image: post.mobile_image,
          seo_title: post.seo_title,
          seo_description: post.seo_description,
        }; // Вибираємо лише необхідні дані
      });

      set({ posts, loading: false });
    } catch (error) {
      console.error(
        "Error fetching posts:",
        error.response?.data || error.message
      );
      set({ error: error.message, loading: false });
    }
  },

  fetchSlugs: async (count) => {
    set({ loading: true, error: null });
    try {
      const url = buildPostsUrl(count);
      const response = await axiosClient.get(url);

      const slugs = response.data.data.map((post) => post.slug);

      set({ slugs, loading: false });
    } catch (error) {
      console.error(
        "Error fetching slugs:",
        error.response?.data || error.message
      );
      set({ error: error.message, loading: false });
    }
  },

  fetchPostBySlug: async (slug) => {
    set({ loading: true, error: null });
    try {
      const url = buildPostsUrl(999); // Обмежуємо кількість постів
      const response = await axiosClient.get(url);

      const post = response.data.data.find((post) => post.slug === slug);

      if (post) {
        /*const imageUrl = post.image?.url;
        const mobileImageUrl = post.mobile_image?.url;

        if (imageUrl) {
          post.image.url = `${cmsUrl}${imageUrl}`;
        }
        if (mobileImageUrl) {
          post.mobile_image.url = `${cmsUrl}${mobileImageUrl}`;
        }*/

        const processedPost = {
          id: post.id,
          slug: post.slug,
          title: post.title,
          content: post.content,
          image: post.image,
          mobile_image: post.mobile_image,
          seo_title: post.seo_title,
          seo_description: post.seo_description,
        }; // Вибираємо тільки необхідні поля

        set({ singlePost: processedPost, loading: false });
      } else {
        set({ singlePost: {}, loading: false });
        console.error("Post not found.");
      }
    } catch (error) {
      console.error(
        "Error fetching post:",
        error.response?.data || error.message
      );
      set({ error: error.message, loading: false });
    }
  },
}));

export default usePostStore;
