import Link from 'next/link'
import React from 'react'
import { useTranslations } from 'next-intl'

const ApproachNeed = () => {
  const t = useTranslations('ourApproach.need')

  return (
    <section className="approach-need">
      <div className="approach-need__container _container">
        <div className="approach-need__body">
          <div className="approach-need__content">
            <h2 className="approach-need__title">{t('title')}</h2>
            <div className="approach-need__buttons">
              <Link href="/business-consulting" className="approach-need__link">
                {t('business')}
              </Link>
              <Link href="/marketing-consulting" className="approach-need__link">
                {t('marketing')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApproachNeed
