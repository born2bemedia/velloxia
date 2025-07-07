import OrderIcon from '@/icons/OrderIcon'
import usePostStore from '@/stores/blogStore'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React, { useEffect } from 'react'

const InsightsWrap = () => {
  const t = useTranslations('help.insights')

  const { posts, fetchPosts, loading, error } = usePostStore()

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="posts-row">
      {posts.map((post) => (
        <Link href={`/help/${post.slug}`} className="post" key={post.id}>
          <div className="top">
            <div className="img-wrap">
              <img src={post.image?.url} alt={post.title} />
              <img src={post.mobile_image.url} alt={`Mobile ${post.title}`} />
            </div>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </div>
          <div className="link">
            {t('readTheGuide')} <OrderIcon />
          </div>
        </Link>
      ))}
    </div>
  )
}

export default InsightsWrap
