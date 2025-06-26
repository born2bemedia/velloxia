import "@/styles/policy.scss";
import axiosClient from "@/app/api/GlobalApi";

import ReactMarkdown from "react-markdown";
import Link from "next/link";

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
        date: post.date,
      }
    : null;
};

// Metadata generation for SEO
export async function generateMetadata() {
  const slug = "refund-policy";
  const post = await fetchPageBySlugServer(slug);

  return {
    title: `${post?.title} | Velloxia`,
  };
}

const PolicyInner = async () => {
  const slug = "refund-policy";
  const singlePage = await fetchPageBySlugServer(slug);

  if (!singlePage) {
    return <div>Page not found</div>; // Handle post not found
  }

  return (
    <>
      <section className="policy-inner">
        <div className="_container">
          <div className="policy-inner__body">
            <div className="top">
              <h1>{singlePage.title}</h1>
              <span>{singlePage.date}</span>
            </div>
            <ReactMarkdown>{singlePage.content}</ReactMarkdown>
          </div>
        </div>
      </section>
    </>
  );
};

export default PolicyInner;
