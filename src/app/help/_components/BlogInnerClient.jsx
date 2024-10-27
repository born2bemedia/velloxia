"use client";
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
      </div>
    </section>
  );
};

export default BlogInnerClient;
