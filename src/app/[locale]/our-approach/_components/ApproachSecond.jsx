import React from 'react'
import { useTranslations } from 'next-intl'

const ApproachSecond = () => {
  const t = useTranslations('ourApproach.second')

  return (
    <section className="approach-second">
      <div className="_container">
        <p className="fadeInUp">{t('title')}</p>
        <h2 className="fadeInUp">{t('subtitle')}</h2>
        <p className="fadeInUp">{t('text')}</p>
      </div>
    </section>
  )
}

export default ApproachSecond
