'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import ArrowRight from '@/icons/slider/ArrowRight'
import ArrowLeft from '@/icons/slider/ArrowLeft'
import useProductStore from '@/stores/productsStore'
import AddToCartButton from '@/components/AddToCartButton'
import { useTranslations } from 'next-intl'

const slides = [
  {
    number: '01.',
    title: 'Social Media & Influencer Marketing',
    text: 'Social Media Strategy Development, Influencer Marketing Strategy, Social Media Management',
    price: '€7,200',
  },
  {
    number: '02.',
    title: 'Advertising & Paid Campaigns',
    text: 'Paid Advertising Campaigns, Digital Advertising Audit, Analytics Setup',
    price: '€6,300',
  },
  {
    number: '03.',
    title: 'Brand Building & Reputation',
    text: 'Personal Brand Building, Brand Messaging and Positioning, Online Reputation Management',
    price: '€7,200',
  },
  {
    title: 'Custom Slide',
  },
]

const HomeTab2 = () => {
  const t = useTranslations('home.solution')

  const [isMobile, setIsMobile] = useState(false)
  const swiperRef = useRef(null)
  const { fetchProducts, getProductByCategoryHome } = useProductStore.getState()
  const [productsArray, setProductsArray] = useState([])

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      await fetchProducts()
      const businessConsultingProducts = getProductByCategoryHome('marketing-consulting-packs', 3)
      setProductsArray(businessConsultingProducts)
      console.log('productsArray', businessConsultingProducts)
    }

    fetchAndSetProducts()
  }, [])

  const nextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext()
    }
  }

  const prevSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev()
    }
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const slidesForLoop = [...slides, ...slides]

  return (
    <div className="tabs-home__tab tab1">
      <div className="tabs-home__wrapper">
        <h3 className="tabs-home__label">{t('topMarketingPacks')}</h3>
        {productsArray.length > 0 ? (
          <Swiper
            className="home-solutions-slider"
            ref={swiperRef}
            spaceBetween={30}
            loop={false}
            breakpoints={{
              575: { slidesPerView: 1 },
              767: { slidesPerView: 3 },
              1200: { slidesPerView: 3 },
            }}
          >
            {productsArray.map((product, index) => (
              <SwiperSlide key={index} className="home-solutions-slider__item">
                <div className="home-solutions-slider__wrapper">
                  <div className="home-solutions-slider__number">
                    {String(index + 1).padStart(2, '0')}.
                  </div>
                  <h3 className="home-solutions-slider__title">{product.title}</h3>
                  <p className="home-solutions-slider__label">{t('includes')}</p>
                  <div
                    className="home-solutions-slider__text"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                  <div className="home-solutions-slider__bottom">
                    <div className="home-solutions-slider__price">€{product.price}</div>
                    <AddToCartButton product={product} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <SwiperSlide className="home-solutions-slider__item">
              <div className="home-solutions-slider__custom">
                <Link href="/marketing-consulting" className="custom-link">
                  {t('more')}
                </Link>
              </div>
            </SwiperSlide>
          </Swiper>
        ) : (
          <div>{t('loading')}</div>
        )}

        <div className="home-solutions-slider__buttons">
          <button onClick={prevSlide} className="home-solutions-slider__prev">
            <ArrowLeft />
          </button>
          <button onClick={nextSlide} className="home-solutions-slider__next">
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomeTab2
