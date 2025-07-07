import '@/styles/help.scss'
import BlogInnerClient from '../_components/BlogInnerClient'
import axiosClient from '@/app/api/GlobalApi'

const fetchPostBySlugServer = async (slug, locale) => {
  const url = `posts?filters[slug][$eq]=${slug}&populate=*&locale=${locale}`
  const response = await axiosClient.get(url)
  const post = response.data.data[0]

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
    : null
}

export async function generateMetadata({ params }) {
  const awaitedParams = await params
  const { slug, locale } = awaitedParams
  const post = await fetchPostBySlugServer(slug, locale)

  return {
    title: post?.seo_title || post?.title || 'Default Title',
    description: post?.seo_description || 'Default description',
  }
}

const BlogInner = async ({ params }) => {
  const awaitedParams = await params
  const { slug, locale } = awaitedParams
  const singlePost = await fetchPostBySlugServer(slug, locale)

  if (!singlePost) {
    return <div>Post not found</div>
  }

  return <BlogInnerClient singlePost={singlePost} />
}

export default BlogInner
