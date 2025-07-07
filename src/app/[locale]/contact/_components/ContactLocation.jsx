'use client'
import React, { useState, useEffect } from 'react'
import '@/styles/contact.scss'
import { fadeInUp } from '@/utils/animations'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Address from '@/icons/Address'
import { useTranslations } from 'next-intl'

const ContactLocation = () => {
  const t = useTranslations('contact.location')

  return (
    <section className="contact-location">
      <div className="contact-location__container container">
        <div className="contact-location__body">
          <div className="contact-location__col-01">
            <h2 className="contact-location__title">
              {t('title.0')} <span>{t('title.1')}</span>
            </h2>
          </div>
          <div className="contact-location__col-02">
            <div className="contact-location__items">
              <div className="contact-location__address">
                <div className="contact-location__icon">
                  <Address />
                </div>
                <div className="contact-location__block">
                  <h3 className="contact-location__label">{t('registeredAddress')}</h3>
                  <Link href="#" className="contact-location__link">
                    Nissi, 68 Agia Napa, 2044, Famagusta, Cyprus
                  </Link>
                </div>
              </div>
              <div className="contact-location__map">
                <h3 className="contact-location__label">{t('findUs')}</h3>
                <div className="contact-location__test">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3268.677559521738!2d33.977711075602905!3d34.989740472818404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dfc560cbcf1ebf%3A0x6815f49b148caa01!2sNissi%20Ave%2068%2C%20Ayia%20Napa%205330%2C%20Cyprus!5e0!3m2!1sen!2sua!4v1731944523609!5m2!1sen!2sua"
                    width="600"
                    height="160"
                    style={{ border: '0' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              <div className="contact-location__address">
                <div className="contact-location__icon">
                  <Address />
                </div>
                <div className="contact-location__block">
                  <h3 className="contact-location__label">{t('officeAddress')}</h3>
                  <Link href="#" className="contact-location__link">
                    Office 61, Floor 6, Roussos Centre Gladstone Str 55, Limassol, 3040, Cyprus
                  </Link>
                </div>
              </div>
              <div className="contact-location__map">
                <h3 className="contact-location__label">{t('findUs')}</h3>
                <div className="contact-location__test">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1640.4482016506547!2d33.0459502696998!3d34.68256400918851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14e733bba8bbbc1f%3A0x72beece4f28a4f11!2sRoussos%20Building!5e0!3m2!1sen!2sua!4v1731944744502!5m2!1sen!2sua"
                    width="600"
                    height="160"
                    style={{ border: '0' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactLocation
