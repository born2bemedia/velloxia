'use client'

import React, { useState, useEffect } from 'react'
import '@/styles/header.scss'
import Link from 'next/link'
import CartIcon from '@/icons/CartIcon'
import MenuIcon from '@/icons/MenuIcon'
import MenuClose from '@/icons/MenuClose'
import LangSwitcher from './LangSwitcher'
import { useTranslations } from 'next-intl'

const Header = () => {
  const t = useTranslations('header.menu')

  const [isActive, setIsActive] = useState(false)
  const [scrolling, setScrolling] = useState(false)

  const toggleMenu = () => {
    setIsActive(!isActive)
  }

  const closeMenu = () => {
    setIsActive(false)
  }

  const handleScroll = () => {
    setScrolling(window.scrollY > 0)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const menuItems = [
    { label: t('0'), path: '/business-consulting' },
    { label: t('1'), path: '/marketing-consulting' },
    { label: t('2'), path: '/our-approach' },
    { label: t('3'), path: '/career' },
    { label: t('4'), path: '/help' },
    { label: t('5'), path: '/contact' },
    { label: t('6'), path: '/log-in' },
  ]

  return (
    <header className={scrolling ? '_active' : ''}>
      <div className="_container">
        <div className="menu-row">
          <Link href="/" onClick={closeMenu}>
            <img src="/logo.svg" alt="Logo" />
          </Link>
          <div className="actions">
            <div className="language">
              <LangSwitcher />
            </div>
            <span></span>
            <Link href="/cart" className="cart" onClick={closeMenu}>
              <CartIcon />
            </Link>
            <span></span>
            <nav className={`header__nav ${isActive ? '_active' : ''}`}>
              <ul className="header__menu">
                {menuItems.map((item, index) => (
                  <li className="header__item" key={index}>
                    <Link href={item.path} className="header__link" onClick={closeMenu}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <button className={`menu-btn ${isActive ? '_active' : ''}`} onClick={toggleMenu}>
              {isActive ? <MenuClose /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
