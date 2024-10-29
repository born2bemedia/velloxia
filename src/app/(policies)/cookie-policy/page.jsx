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
        content: post.Texts,
      }
    : null;
};

// Metadata generation for SEO
export async function generateMetadata() {
  const slug = "cookie-policy";
  const post = await fetchPageBySlugServer(slug);

  return {
    title: `${post?.title} | Velloxia`,
  };
}

const PolicyInner = async () => {
  const slug = "cookie-policy";
  const singlePage = await fetchPageBySlugServer(slug);


  if (!singlePage) {
    return <div>Page not found</div>; // Handle post not found
  }

  // Option 2: Map over each content block and render individually
  const renderedContent = singlePage.content.map((block) => (
    <div className="block" key={block.id}>
      <ReactMarkdown>{block.contents}</ReactMarkdown>
    </div>
  ));

  return (
    <>
      {" "}
      <section className="policy-hero">
        <div className="_container">
          <div className="policy-hero__body">
            <div className="top">
              <h1>{singlePage.title}</h1>
              <p>Last Updated: 29 October, 2024</p>
            </div>
          </div>
        </div>
      </section>
      <section className="policy-inner">
        <div className="_container">
          <div className="policy-inner__body">{renderedContent}</div>
        </div>
      </section>
      <section className="policy-contact">
        <div className="policy-contact__container _container">
          <div className="policy-contact__body">
            <div className="policy-contact__content">
              <h2 className="policy-contact__title">Contact Us</h2>
              <p className="policy-contact__subtitle">
                If you have questions about these Terms and Conditions, please
                contact us at:
              </p>
              <div className="policy-contact__buttons">
                <span className="policy-contact__link">
                  Phone: <Link href="tel:">Phone</Link>
                </span>
                <span className="policy-contact__link">
                  Email:{" "}
                  <Link href="mailto:info@velloxia.com">info@velloxia.com</Link>
                </span>
                <span className="policy-contact__link">
                  Website:{" "}
                  <Link href="https://velloxia.com/">
                    https://velloxia.com/
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PolicyInner;
