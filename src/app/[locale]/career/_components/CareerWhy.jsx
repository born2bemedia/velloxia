'use client'
import React, { useState, useRef } from 'react'
import '@/styles/career.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import ArrowLeft from '@/icons/slider/ArrowLeft'
import ArrowRight from '@/icons/slider/ArrowRight'

const CareerWhy = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const swiperRef = useRef(null)

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

  const slides = [
    {
      icon: '/images/career/career-icon-01.svg',
      title: t('0.title'),
      text: t('0.text'),
    },
    {
      icon: '/images/career/career-icon-02.svg',
      title: t('1.title'),
      text: t('1.text'),
    },
    {
      icon: '/images/career/career-icon-03.svg',
      title: t('2.title'),
      text: t('2.text'),
    },
    {
      icon: '/images/career/career-icon-04.svg',
      title: t('3.title'),
      text: t('3.text'),
    },
    {
      icon: '/images/career/career-icon-05.svg',
      title: t('4.title'),
      text: t('4.text'),
    },
    {
      icon: '/images/career/career-icon-06.svg',
      title: t('5.title'),
      text: t('5.text'),
    },
  ]

  return (
    <section className="career-why">
      <div className="career-why__container _container">
        <div className="career-why__body">
          <h2 className="career-why__title">{t('title')}</h2>
          <Swiper
            className="career-why-slider"
            ref={swiperRef}
            modules={[Navigation]}
            spaceBetween={24}
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
            {slides.map((slide, index) => (
              <SwiperSlide key={index} className="career-why-slider__item">
                <div className="career-why-slider__wrapper">
                  <img src={slide.icon} alt="icon" className="career-why-slider__icon" />
                  <h3 className="career-why-slider__title">{slide.title}</h3>
                  <div className="career-why-slider__text">{slide.text}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="career-why-slider__buttons">
            <button onClick={prevSlide} className="career-why-slider__prev">
              <ArrowLeft />
            </button>
            <button onClick={nextSlide} className="career-why-slider__next">
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CareerWhy
