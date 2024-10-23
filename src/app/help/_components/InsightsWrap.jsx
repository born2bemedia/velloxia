import OrderIcon from "@/icons/OrderIcon";
import usePostStore from "@/stores/blogStore";
import Link from "next/link";
import React, { useEffect } from "react";

const InsightsWrap = () => {
  const { posts, fetchPosts, loading, error } = usePostStore();
  useEffect(() => {
    fetchPosts();
    console.log(posts);
  }, []);
  return (
    <div className="posts-row">
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <div className="top">
            <div className="img-wrap">
              <img src={post.image?.url} alt={post.title} />
              <img src={post.mobile_image.url} alt={`Mobile ${post.title}`} />
            </div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </div>
          <Link href={`/help/${post.slug}`}>
            Read the Guide <OrderIcon />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default InsightsWrap;
