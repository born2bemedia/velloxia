import PlusIcon from '@/icons/PlusIcon'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

const FaqAccordion = () => {
  const t = useTranslations('help.accordion')

  const [activeIndex, setActiveIndex] = useState(1)

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null)
    } else {
      setActiveIndex(index)
    }
  }
  return (
    <div className="faq-accordion">
      <div
        className={`item ${activeIndex === 1 ? 'active' : ''}`}
        onClick={() => toggleAccordion(1)}
      >
        <div className="accordion-title">
          <span>{t('0')}</span>
          <PlusIcon />
        </div>
        {activeIndex === 1 && (
          <div className="accordion-content">
            <p>{t('1')}</p>
          </div>
        )}
      </div>
      <div
        className={`item ${activeIndex === 2 ? 'active' : ''}`}
        onClick={() => toggleAccordion(2)}
      >
        <div className="accordion-title">
          <span>{t('2')}</span>
          <PlusIcon />
        </div>
        {activeIndex === 2 && (
          <div className="accordion-content">
            <p>{t('3')}</p>
          </div>
        )}
      </div>
      <div
        className={`item ${activeIndex === 3 ? 'active' : ''}`}
        onClick={() => toggleAccordion(3)}
      >
        <div className="accordion-title">
          <span>{t('4')}</span>
          <PlusIcon />
        </div>
        {activeIndex === 3 && (
          <div className="accordion-content">
            <p>{t('5')}</p>
          </div>
        )}
      </div>
      <div
        className={`item ${activeIndex === 4 ? 'active' : ''}`}
        onClick={() => toggleAccordion(4)}
      >
        <div className="accordion-title">
          <span>{t('6')}</span>
          <PlusIcon />
        </div>
        {activeIndex === 4 && (
          <div className="accordion-content">
            <p>{t('7')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FaqAccordion
