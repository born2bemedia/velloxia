'use client'

import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'

const ApproachSteps = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sliderWrapperRef = useRef(null)
  const sliderContainerRef = useRef(null)

  const t = useTranslations('ourApproach.steps')

  useEffect(() => {
    const handleScroll = () => {
      if (!sliderWrapperRef.current || !sliderContainerRef.current) {
        return
      }

      const titles = document.querySelectorAll('.steps__slider-titles li')
      const totalSlides = titles.length

      // Get the total height of the wrapper and calculate per-slide scroll range
      const wrapperHeight = sliderWrapperRef.current.scrollHeight
      const sliderStart = sliderWrapperRef.current.offsetTop
      const scrollPerSlide = wrapperHeight / totalSlides

      // Get the current scroll position
      const scrollY = window.scrollY

      // Check if we are in the sticky section
      if (scrollY >= sliderStart && scrollY <= sliderStart + wrapperHeight) {
        // Calculate the active slide based on scroll position
        const activeSlide = Math.min(
          totalSlides - 1,
          Math.floor((scrollY - sliderStart) / scrollPerSlide),
        )

        // Only update if the currentIndex changes
        if (activeSlide !== currentIndex) {
          setCurrentIndex(activeSlide)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [currentIndex])

  return (
    <section className="approach-steps">
      <div className="_container">
        <div className="steps__slider-wrapper" ref={sliderWrapperRef}>
          <div className="steps__slider" ref={sliderContainerRef}>
            <div className="steps__slider-left">
              <div className="steps__image-container">
                <Image
                  width={388}
                  height={422}
                  src="/images/approach/step1.png"
                  className={`steps__slider-image ${currentIndex === 0 ? 'active' : ''}`}
                  alt="step1"
                />
                <Image
                  width={388}
                  height={422}
                  src="/images/approach/step2.png"
                  className={`steps__slider-image ${currentIndex === 1 ? 'active' : ''}`}
                  alt="step2"
                />
                <Image
                  width={388}
                  height={422}
                  src="/images/approach/step3.png"
                  className={`steps__slider-image ${currentIndex === 2 ? 'active' : ''}`}
                  alt="step3"
                />
                <Image
                  width={388}
                  height={422}
                  src="/images/approach/step4.png"
                  className={`steps__slider-image ${currentIndex === 3 ? 'active' : ''}`}
                  alt="step4"
                />
              </div>
            </div>

            <div className="steps__slider-right">
              <ul className="steps__slider-titles">
                <li className={currentIndex === 0 ? 'active' : ''} data-slide="0">
                  <span className="number">
                    <span>01.</span>
                  </span>
                  <div className="content">
                    <h3>{t('0.title')}</h3>
                    <p className="description">{t('0.text')}</p>
                  </div>
                </li>
                <li className={currentIndex === 1 ? 'active' : ''} data-slide="1">
                  <span className="number">
                    <span>02.</span>
                  </span>
                  <div className="content">
                    <h3>{t('1.title')}</h3>
                    <p className="description">{t('1.text')}</p>
                  </div>
                </li>
                <li className={currentIndex === 2 ? 'active' : ''} data-slide="2">
                  <span className="number">
                    <span>03.</span>
                  </span>
                  <div className="content">
                    <h3>{t('2.title')}</h3>
                    <p className="description">{t('2.text')}</p>
                  </div>
                </li>
                <li className={currentIndex === 3 ? 'active' : ''} data-slide="3">
                  <span className="number">
                    <span>04.</span>
                  </span>
                  <div className="content">
                    <h3>{t('3.title')}</h3>
                    <p className="description">{t('3.text')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApproachSteps
