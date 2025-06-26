'use client'
import React, { useState, useEffect } from 'react'
import '@/styles/contact.scss'
import { fadeInUp } from '@/utils/animations'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

const ContactHero = () => {
  const t = useTranslations('contact.hero')

  return (
    <section className="contact-hero">
      <div className="contact-hero__container">
        <div className="contact-hero__body">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="contact-hero__title"
          >
            {t('title')}
          </motion.h1>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0.2}
            className="contact-hero__content"
          >
            <img
              src="/images/contact/contact-arrow.svg"
              alt="arrow"
              className="contact-hero__image-arrow"
            />
            <img
              src="/images/contact/contact-img-01.png"
              alt="image"
              className="contact-hero__img-01"
            />
            <img
              src="/images/contact/contact-img-02.png"
              alt="image"
              className="contact-hero__img-02"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactHero
