import React from 'react'
import '@/styles/thankyou.scss'
import { useTranslations } from 'next-intl'

const Thankyou = () => {
  const t = useTranslations('thankyou')

  return (
    <section className="thankyou">
      <div className="_container">
        <div className="thankyou__body">
          <h1>{t('title')}</h1>
          <p>
            {t('text')}
            <br />
            <b>{t('thankYou')}</b>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Thankyou
