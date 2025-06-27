import React from 'react'
import '@/styles/base.scss'
import '@/styles/business-consulting.scss'
import ConsultingHero from './_components/ConsultingHero'
import useProductStore from '@/stores/productsStore'
import ProductsWrap from './_components/ProductsWrap'
import PacksWrap from './_components/PacksWrap'
import { getTranslations } from 'next-intl/server'

export const metadata = {
  title: 'Business Consulting Services and Packs | Velloxia',
  description:
    'Get expert business consulting services tailored for individuals. Practical solutions for starting and growing your business.',
  openGraph: {
    title: 'Business Consulting Services and Packs | Velloxia',
    description:
      'Get expert business consulting services tailored for individuals. Practical solutions for starting and growing your business.',
    images: 'https://velloxia.com/images/meta.png',
  },
}

const BusinessConsulting = async () => {
  const t = await getTranslations('businessConsulting')

  const { fetchProducts, getProductByCategory } = useProductStore.getState()

  await fetchProducts()

  const businessConsultingProducts = getProductByCategory('business-consulting-products')
  const businessConsultingPacks = getProductByCategory('business-consulting-packs')

  return (
    <>
      <ConsultingHero />
      <ProductsWrap products={businessConsultingProducts} />
      <PacksWrap products={businessConsultingPacks} title={t('title')} />
    </>
  )
}

export default BusinessConsulting
