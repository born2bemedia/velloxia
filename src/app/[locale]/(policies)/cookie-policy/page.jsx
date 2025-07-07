import '@/styles/policy.scss'
import axiosClient from '@/app/api/GlobalApi'

import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

const fetchPageBySlugServer = async (slug, locale) => {
  const url = `pages?filters[slug][$eq]=${slug}&filters[locale][$eq]=${locale}&populate=*`
  const response = await axiosClient.get(url)
  const post = response.data.data[0]

  return post
    ? {
        id: post.id,
        slug: post.slug,
        title: post.title,
        content: post.content,
        date: post.date,
      }
    : null
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const slug = 'terms-and-conditions'
  const post = await fetchPageBySlugServer(slug, locale)

  return {
    title: `${post?.title} | Velloxia`,
  }
}

const PolicyInner = async ({ params }) => {
  const { locale } = await params
  const slug = 'cookie-policy'
  const singlePage = await fetchPageBySlugServer(slug, locale)

  if (!singlePage) {
    return <div>Page not found</div>
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
  )
}

export default PolicyInner
