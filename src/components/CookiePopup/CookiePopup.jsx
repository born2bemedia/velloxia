'use client'
import { useState, useEffect } from 'react'
import styles from './CookiePopup.module.scss'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'

const CookiePopup = () => {
  const [isVisible, setIsVisible] = useState(false)

  const t = useTranslations('cookiePopup')

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted')
    if (!hasAcceptedCookies) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true')
    setIsVisible(false)
  }

  const handleDecline = () => {
    setIsVisible(false)
  }

  return (
    <div
      className={classNames(styles.cookiePopup, {
        [styles.visible]: isVisible,
      })}
    >
      <div className={styles.content}>
        <h2>{t('title')}</h2>
        <p>
          {t('desc.0')} <a href="/cookie-policy">{t('desc.1')}</a> {t('desc.2')}
        </p>
      </div>
      <div className={styles.buttons}>
        <button onClick={handleDecline} className={classNames(styles.decline)}>
          {t('decline')}
        </button>
        <button onClick={handleAccept} className={classNames(styles.accept)}>
          {t('accept')}
        </button>
      </div>
    </div>
  )
}

export default CookiePopup
