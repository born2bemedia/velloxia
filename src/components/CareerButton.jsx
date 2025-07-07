// src/components/CareerButton.jsx
import React from 'react'
import { usePopup } from '@/context/PopupsContext'
import { useTranslations } from 'next-intl'

const CareerButton = () => {
  const t = useTranslations('career.apply')

  const { setCareerPopupDisplay } = usePopup()

  return (
    <button onClick={() => setCareerPopupDisplay(true)} className="career-apply__link">
      {t('title')}
    </button>
  )
}

export default CareerButton
