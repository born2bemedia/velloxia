'use client'
import React, { useState, useEffect } from 'react'
import '@/styles/contact.scss'
import { fadeInUp } from '@/utils/animations'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Phone from '@/icons/Phone'
import Email from '@/icons/Email'
import { useTranslations } from 'next-intl'

const ContactConnect = () => {
  const t = useTranslations('contact.connect')

  return (
    <section className="contact-connect">
      <div className="contact-connect__container container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="contact-connect__body"
        >
          <div className="contact-connect__col-01">
            <h2 className="contact-connect__title">
              <span>{t('title.0')}</span> {t('title.1')}
            </h2>
          </div>
          <div className="contact-connect__col-02">
            <div className="contact-connect__items">
              <div className="contact-connect__item">
                <div className="contact-connect__icon">
                  <Phone />
                </div>
                <div className="contact-connect__block">
                  <h3 className="contact-connect__label">{t('phone')}</h3>
                  <Link href="tel:+35723010082" className="contact-connect__link">
                    +35723010082
                  </Link>
                </div>
              </div>
              <div className="contact-connect__item">
                <div className="contact-connect__icon">
                  <Email />
                </div>
                <div className="contact-connect__block">
                  <h3 className="contact-connect__label">{t('email')}</h3>
                  <Link href="mailto:info@velloxia.com" className="contact-connect__link">
                    info@velloxia.com
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactConnect
