import Image from 'next/image'
import React from 'react'
import { useTranslations } from 'next-intl'

const ApproachHero = () => {
  const t = useTranslations('ourApproach.hero')

  return (
    <section className="approach-hero">
      <div className="_container">
        <div className="approach-hero__body">
          <h1 className="fadeInUp">
            {t('title.0')} <br />
            {t('title.1')}
          </h1>
          <div className="images">
            <img src="/images/arrowDownMob.svg" className="arrowDownMob" />
            <Image src="/images/approach/hero1.png" width={450} height={283} alt="hero2" />
            <Image src="/images/approach/hero2.png" width={345} height={205} alt="hero1" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApproachHero
