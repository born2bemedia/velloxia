'use client'
import React, { useState, useEffect } from 'react'
import '@/styles/home/home.scss'
import { fadeInUp } from '@/utils/animations'
import { motion } from 'framer-motion'
import { useTranslations } from 'use-intl'

const HomeHero = () => {
  const t = useTranslations('home.hero')

  return (
    <section className="home-hero">
      <div className="home-hero__container _container">
        <div className="home-hero__body">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="home-hero__title"
          >
            <span>{t('title.0')}</span> {t('title.1')}
          </motion.h1>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0.2}
            className="home-hero__content"
          >
            <img
              src="/images/home/home-arrow-01.svg"
              alt="arrow"
              className="home-hero__image-arrow"
            />
            <img src="/images/home/home-img-01.png" alt="image" className="home-hero__img-01" />
            <img src="/images/home/home-img-02.png" alt="image" className="home-hero__img-02" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HomeHero
