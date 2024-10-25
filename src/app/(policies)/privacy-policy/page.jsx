import "@/styles/help.scss";
import axiosClient from "@/app/api/GlobalApi";

import ReactMarkdown from "react-markdown";

// Use server-side data fetching to get the post by slug
const fetchPageBySlugServer = async (slug) => {
  const url = `pages?filters[slug][$eq]=${slug}&populate=*`; // Adjust your API query here
  const response = await axiosClient.get(url);
  const post = response.data.data[0]; // Assuming the response returns a single post

  return post
    ? {
        id: post.id,
        slug: post.slug,
        title: post.title,
        content: post.content,
      }
    : null;
};

// Metadata generation for SEO
export async function generateMetadata() {
  const slug = "privacy-policy";
  const post = await fetchPageBySlugServer(slug);

  return {
    title: `${post?.title} | Velloxia`,
  };
}

const BlogInner = async () => {
  const slug = "privacy-policy";
  const singlePage = await fetchPageBySlugServer(slug);

  if (!singlePage) {
    return <div>Page not found</div>; // Handle post not found
  }

  return (
    <section className="blog-inner">
      <div className="_container">
        <div className="blog-inner__body">
          <div className="top">
            <h1>{singlePage.title}</h1>
          </div>
          <article>
            <ReactMarkdown>{singlePage.content}</ReactMarkdown>
          </article>
        </div>
      </div>
    </section>
  );
};

export default BlogInner;
