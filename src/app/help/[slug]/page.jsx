"use client";
import "@/styles/help.scss";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import usePostStore from "@/stores/blogStore";
import Head from "next/head";
import Link from "next/link";

const BlogInner = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const { fetchPostBySlug, singlePost, loading, error } = usePostStore();

  useEffect(() => {
    if (slug) {
      fetchPostBySlug(slug);
    }
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!singlePost) return <p>Post not found</p>;

  return (
    <>
      <Head>
        <title>{singlePost.seo_title || singlePost.title}</title>
        <meta
          name="description"
          content={singlePost.seo_description || "Default description"}
        />
      </Head>
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
      <section className="more-insights">
        <div className="_container">
          <div className="more-insights__body">
            <img src="/images/help/lamp.png" />
            <img src="/images/arrowRight.svg" />
            <Link href="/help">More Insights</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogInner;
