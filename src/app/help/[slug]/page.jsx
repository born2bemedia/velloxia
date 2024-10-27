import "@/styles/help.scss";
import BlogInnerClient from "../_components/BlogInnerClient";
import axiosClient from "@/app/api/GlobalApi";

// Use server-side data fetching to get the post by slug
const fetchPostBySlugServer = async (slug) => {
  const url = `posts?filters[slug][$eq]=${slug}&populate=*`; // Adjust your API query here
  const response = await axiosClient.get(url);
  const post = response.data.data[0]; // Assuming the response returns a single post

  return post
    ? {
        id: post.id,
        slug: post.slug,
        title: post.title,
        content: post.content,
        image: post.image,
        mobile_image: post.mobile_image,
        seo_title: post.seo_title,
        seo_description: post.seo_description,
      }
    : null;
};

// Metadata generation for SEO
export async function generateMetadata({ params }) {
  const awaitedParams = await params; // Await the params
  const { slug } = awaitedParams;
  const post = await fetchPostBySlugServer(slug);

  return {
    title: post?.seo_title || post?.title || "Default Title",
    description: post?.seo_description || "Default description",
  };
}

const BlogInner = async ({ params }) => {
  const awaitedParams = await params; // Await the params
  const { slug } = awaitedParams;
  const singlePost = await fetchPostBySlugServer(slug);

  if (!singlePost) {
    return <div>Post not found</div>; // Handle post not found
  }

  return <BlogInnerClient singlePost={singlePost} />;
};

export default BlogInner;
