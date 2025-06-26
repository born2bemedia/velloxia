'use client'
import React, { useState, useEffect, useRef } from 'react'
import '@/styles/home/home.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { fadeInUp } from '@/utils/animations'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ArrowLeft from '@/icons/slider/ArrowLeft'
import ArrowRight from '@/icons/slider/ArrowRight'
import useProductStore from '@/stores/productsStore'
import AddToCartButton from '@/components/AddToCartButton'
import { useTranslations } from 'next-intl'

const slides = [
  {
    number: '01.',
    title: 'Business Strategy Development',
    text: 'A comprehensive documented strategy that outlines your business goals and the approaches to achieve them.',
    price: '€2,800',
  },
  {
    number: '02.',
    title: 'Market Research and Analysis',
    text: 'In-depth analysis of market trends and customer preferences to inform business decisions.',
    price: '€3,200',
  },
  {
    number: '03.',
    title: 'Financial Forecasting and Budgeting',
    text: 'Documented accurate financial forecasts and budgeting plans to guide financial management.',
    price: '€2,000',
  },
]

const HomeMarketing = () => {
  const t = useTranslations('home.business')

  const { fetchProducts, getProductByCategoryHome } = useProductStore.getState()
  const [productsArray, setProductsArray] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const swiperRef = useRef(null)

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      await fetchProducts()
      const businessConsultingProducts = getProductByCategoryHome('business-consulting-products', 3)
      setProductsArray(businessConsultingProducts)
      console.log('productsArray', businessConsultingProducts)
    }

    fetchAndSetProducts()
  }, [])

  const nextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext()
    }
  }

  const prevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev()
    }
  }

  return (
    <section className="home-business">
      <div className="home-business__container _container">
        <div className="home-business__body">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="home-business__title"
          >
            {t('title.0')} <span>{t('title.1')}</span>
          </motion.h2>
          <div className="home-business__content">
            <div className="home-business__wrapper">
              <div className="home-business__col-01">
                {productsArray.length > 0 ? (
                  <Swiper
                    className="home-business-slider"
                    ref={swiperRef}
                    modules={[Navigation]}
                    spaceBetween={20}
                    loop={true}
                    onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
                    breakpoints={{
                      575: {
                        slidesPerView: 1,
                      },
                      767: {
                        slidesPerView: 2,
                      },
                      1200: {
                        slidesPerView: 3,
                      },
                    }}
                  >
                    {productsArray.map((product, index) => (
                      <SwiperSlide key={index} className="home-business-slider__item">
                        <div className="home-business-slider__wrapper">
                          <div className="home-business-slider__number">
                            {String(index + 1).padStart(2, '0')}.
                          </div>
                          <h3 className="home-business-slider__title">{product.title}</h3>
                          <div
                            className="home-business-slider__text"
                            dangerouslySetInnerHTML={{
                              __html: product.description,
                            }}
                          />
                          <div className="home-business-slider__bottom">
                            <div className="home-business-slider__price">€{product.price}</div>
                            <AddToCartButton product={product} />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div>{t('loading')}</div>
                )}
              </div>
              <div className="home-business__col-02">
                <div className="home-business__banner">
                  <Link href="/business-consulting/" className="home-business__more">
                    {t('more')}
                  </Link>
                </div>
              </div>
            </div>
            <div className="home-business-slider__buttons">
              <button onClick={prevSlide} className="home-business-slider__prev">
                <ArrowLeft />
              </button>
              <button onClick={nextSlide} className="home-business-slider__next">
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeMarketing
