'use client'
import React, { useState, useEffect } from 'react'
import '@/styles/home/home.scss'
import { fadeInUp } from '@/utils/animations'
import { motion } from 'framer-motion'
import HomeTab1 from '../HomeTabs/HomeTab1'
import HomeTab2 from '../HomeTabs/HomeTab2'
import { useTranslations } from 'next-intl'

const HomeSolutions = () => {
  const t = useTranslations('home.solutions')

  const [activeTab, setActiveTab] = useState('tab1')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const tabChange = (value) => {
    setActiveTab(value)
  }

  return (
    <section className="home-solutions">
      <div className="home-solutions__container _container">
        <div className="home-solutions__body">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="home-solutions__title"
          >
            {t('title.0')} <span>{t('title.1')}</span> {t('title.2')}
          </motion.h2>
          <div className="home-solutions__tabs">
            <div className="tabs-home">
              {!isMobile && (
                <div className="tabs-home__nav">
                  <button
                    onClick={() => tabChange('tab1')}
                    className={`tabs-home__button ${activeTab == 'tab1' ? 'active' : ''}`}
                  >
                    {t('topBusinessPacks')}
                  </button>
                  <button
                    onClick={() => tabChange('tab2')}
                    className={`tabs-home__button ${activeTab == 'tab2' ? 'active' : ''}`}
                  >
                    {t('topMarketingPacks')}
                  </button>
                </div>
              )}

              <div className="tabs-home__content">
                {isMobile ? (
                  <>
                    <HomeTab1 />
                    <HomeTab2 />
                  </>
                ) : (
                  <>
                    {activeTab == 'tab1' && <HomeTab1 />}
                    {activeTab == 'tab2' && <HomeTab2 />}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeSolutions
