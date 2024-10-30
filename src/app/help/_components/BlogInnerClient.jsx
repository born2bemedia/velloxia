"use client";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const BlogInnerClient = ({ singlePost }) => {
  return (
    <section className="blog-inner">
      <div className="_container">
        <div className="blog-inner__body">
          <div className="top">
            <div className="img-wrap">
              <img src={singlePost.image?.url} alt={singlePost.title} />
              <img
                src={singlePost.mobile_image?.url}
                alt={`Mobile ${singlePost.title}`}
              />
            </div>
            <h1>{singlePost.title}</h1>
          </div>
          <article>
            <ReactMarkdown>{singlePost.content}</ReactMarkdown>
          </article>
        </div>

        <div className="blog-inner__banner">
          <img src="/images/career/career-img-04.png" alt="image" className="blog-inner__img-01" />
          <img src="/images/career/career-arrow.svg" alt="arrow" className="blog-inner__img-02" />
          <Link className="blog-inner__link-banner" href="/help">More Insights</Link>
        </div>
      </div>
    </section>

  );
};

export default BlogInnerClient;
