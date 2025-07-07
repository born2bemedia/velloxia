'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/swiper-bundle.css' // Swiper styles
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const ApproachStepsMob = () => {
  const t = useTranslations('ourApproach.stepsMob')

  return (
    <section className="approach-steps-mob">
      <div className="_container">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: '.arrow-prev',
            nextEl: '.arrow-next',
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay settings
          loop={true}
          effect="slide"
        >
          <SwiperSlide>
            <div className="slide">
              <span className="number">01.</span>
              <h3>
                {t('0.title.0')} <br />
                {t('0.title.1')} <br />
                {t('0.title.2')}
              </h3>
              <p>{t('0.text')}</p>
              <div className="divider">
                <span className="green"></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="arrows">
                <img className="arrow-prev" src="/images/arrowPrev.svg" alt="Previous" />
                <img className="arrow-next" src="/images/arrowNext.svg" alt="Next" />
              </div>
              <div className="image">
                <Image width={388} height={422} src="/images/approach/step1.png" alt="step1" />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide">
              <span className="number">02.</span>
              <h3>{t('1.title')}</h3>
              <p>{t('1.text')}</p>
              <div className="divider">
                <span></span>
                <span className="green"></span>
                <span></span>
                <span></span>
              </div>
              <div className="arrows">
                <img className="arrow-prev" src="/images/arrowPrev.svg" alt="Previous" />
                <img className="arrow-next" src="/images/arrowNext.svg" alt="Next" />
              </div>
              <div className="image">
                <Image width={388} height={422} src="/images/approach/step2.png" alt="step2" />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide">
              <span className="number">03.</span>
              <h3>
                {t('2.title.0')} <br />
                {t('2.title.1')} <br />
                {t('2.title.2')}
              </h3>
              <p>
                {t('2.text.0')} <br />
                {t('2.text.1')}
              </p>
              <div className="divider">
                <span></span>
                <span></span>
                <span className="green"></span>
                <span></span>
              </div>
              <div className="arrows">
                <img className="arrow-prev" src="/images/arrowPrev.svg" alt="Previous" />
                <img className="arrow-next" src="/images/arrowNext.svg" alt="Next" />
              </div>
              <div className="image">
                <Image width={388} height={422} src="/images/approach/step3.png" alt="step3" />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide">
              <span className="number">04.</span>
              <h3>{t('3.title')}</h3>
              <p>{t('3.text')}</p>
              <div className="divider">
                <span></span>
                <span></span>
                <span></span>
                <span className="green"></span>
              </div>
              <div className="arrows">
                <img className="arrow-prev" src="/images/arrowPrev.svg" alt="Previous" />
                <img className="arrow-next" src="/images/arrowNext.svg" alt="Next" />
              </div>
              <div className="image">
                <Image width={388} height={422} src="/images/approach/step4.png" alt="step4" />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  )
}

export default ApproachStepsMob
