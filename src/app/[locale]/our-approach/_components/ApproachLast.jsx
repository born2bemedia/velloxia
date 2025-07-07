import Link from 'next/link'
import React from 'react'
import { useTranslations } from 'next-intl'

const ApproachLast = () => {
  const t = useTranslations('ourApproach.last')

  return (
    <section className="approach-need ">
      <div className="approach-need__container _container">
        <div className="approach-need__body last">
          <div className="approach-need__content">
            <h2 className="approach-need__title">
              {t('title.0')} <br />
              {t('title.1')}
            </h2>
            <div className="approach-need__buttons">
              <Link href="/contact" className="approach-need__link _last">
                {t('contact')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApproachLast
