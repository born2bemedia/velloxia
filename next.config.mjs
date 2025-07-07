import createNextIntlPlugin from 'next-intl/plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'velloxia-cms.onrender.com', 'cms.velloxia.com'],
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
