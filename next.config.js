const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'velloxia-cms.onrender.com', 'cms.velloxia.com'],
  },
  // You can add other configurations here as needed
};

module.exports = withNextIntl(nextConfig);
