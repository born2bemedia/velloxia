import React from 'react'
import '@/styles/footer.scss'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Footer = () => {
  const t = useTranslations('footer')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__container _container">
        <div className="footer__body">
          <div className="footer__row-01">
            <div className="footer__wrapper">
              <div className="footer__col-01">
                <Link href="/" className="footer__logo">
                  <img src="/logo-white.svg" alt="logo" />
                </Link>
                <h2 className="footer__title">Noscemo LTD</h2>
                <div className="footer__text">{t('label')}</div>
              </div>
              <div className="footer__col-02">
                <div className="nav-row">
                  <nav className="footer__nav">
                    <ul className="footer__menu-list">
                      <li className="footer__menu-item">
                        <Link href="/business-consulting" className="footer__menu-link">
                          {t('menu.0')}
                        </Link>
                      </li>
                      <li className="footer__menu-item">
                        <Link href="/log-in" className="footer__menu-link">
                          {t('menu.1')}
                        </Link>
                      </li>
                      <li className="footer__menu-item">
                        <Link href="/help" className="footer__menu-link">
                          {t('menu.2')}
                        </Link>
                      </li>
                      <li className="footer__menu-item">
                        <Link href="/our-approach" className="footer__menu-link">
                          {t('menu.3')}
                        </Link>
                      </li>
                      <li className="footer__menu-item">
                        <Link href="/marketing-consulting" className="footer__menu-link">
                          {t('menu.4')}
                        </Link>
                      </li>
                      <li className="footer__menu-item">
                        <Link href="/cart" className="footer__menu-link">
                          {t('menu.5')}
                        </Link>
                      </li>
                      <li className="footer__menu-item">
                        <Link href="/help" className="footer__menu-link">
                          {t('menu.6')}
                        </Link>
                      </li>
                      <li className="footer__menu-item">
                        <Link href="/contact" className="footer__menu-link">
                          {t('menu.7')}
                        </Link>
                      </li>
                    </ul>
                  </nav>

                  <nav className="footer__nav">
                    <ul className="footer__menu-list">
                      <li className="footer__menu-item">
                        <Link href="mailto:info@velloxia.com" className="footer__menu-link">
                          <img src="/images/email.svg" />
                          <span>info@velloxia.com</span>
                        </Link>
                      </li>
                      <li className="footer__menu-item">
                        <Link href="tel:+35723010082" className="footer__menu-link">
                          <img src="/images/phone.svg" />
                          <span>+35723010082</span>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>

                <ul className="footer__contacts">
                  <li className="footer__contact">
                    <Link href="mailto:info@velloxia.com" className="footer__menu-link">
                      <img src="images/email.svg" />
                      info@velloxia.com
                    </Link>
                  </li>
                  <li className="footer__contact">
                    <Link href="tel:+35723010082" className="footer__menu-link">
                      <img src="images/phone.svg" />
                      +35723010082
                    </Link>
                  </li>
                  <li className="footer__contact">
                    <img src="/images/address.svg" />
                    <span>
                      {t('registeredAddress')}:{' '}
                      <Link href="#" className="footer__link">
                        Nissi, 68 Agia Napa, <br />
                        2044, Famagusta, Cyprus
                      </Link>
                    </span>
                  </li>
                  <li className="footer__contact">
                    <img src="/images/address.svg" />
                    <span>
                      {t('officeAddress')}:{' '}
                      <Link href="#" className="footer__link">
                        Office 61, Floor 6, Roussos Centre <br />
                        Gladstone Str 55, Limassol, 3040, Cyprus
                      </Link>
                    </span>
                  </li>
                  <li className="footer__contact">
                    <div className="soc">
                      <a href="https://www.instagram.com/velloxiacom">
                        <img src="/images/inst.svg" />
                      </a>
                      <a href="https://x.com/Velloxiacom">
                        <img src="/images/x.svg" />
                      </a>
                      <a href="https://www.facebook.com/velloxiaconsulting/">
                        <img src="/images/fb.svg" />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer__row-02">
            <nav className="footer__policy">
              <ul className="footer__policy-list">
                <li className="footer__policy-item">
                  <Link href="/terms-and-conditions" className="footer__policy-link">
                    {t('menu.8')}
                  </Link>
                </li>
                <li className="footer__policy-item">
                  <Link href="/privacy-policy" className="footer__policy-link">
                    {t('menu.9')}
                  </Link>
                </li>
                <li className="footer__policy-item">
                  <Link href="/cookie-policy" className="footer__policy-link">
                    {t('menu.10')}
                  </Link>
                </li>
                <li className="footer__policy-item">
                  <Link href="/refund-policy" className="footer__policy-link">
                    {t('menu.11')}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="footer__row-03">
            <div className="footer__copy">© {currentYear} Noscemo LTD. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
