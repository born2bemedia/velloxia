"use client";

import React, { useState, useEffect } from "react";
import "@/styles/header.scss";
import Link from "next/link";
import CartIcon from "@/icons/CartIcon";
import MenuIcon from "@/icons/MenuIcon";
import MenuClose from "@/icons/MenuClose";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [scrolling, setScrolling] = useState(false); // Для отслеживания скролла

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  // Обработчик скролла
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); 

    return () => {
      window.removeEventListener("scroll", handleScroll); 
    };
  }, []);

  return (
    <header className={scrolling ? '_active' : ''}>
      <div className="_container">
        <div className="menu-row">
          <Link href="/">
            <img src="/logo.svg" alt="Logo" />
          </Link>
          <div className="actions">
            <Link href="#" className="cart">
              <CartIcon />
            </Link>
            <span></span>
            <nav className={`header__nav ${isActive ? '_active' : ''}`}>
              <ul className="header__menu">
                <li className="header__item">
                  <Link href="#" className="header__link">Business Consulting</Link>
                </li>
                <li className="header__item">
                  <Link href="#" className="header__link">Marketing Consulting</Link>
                </li>
                <li className="header__item">
                  <Link href="#" className="header__link">Help</Link>
                </li>
                <li className="header__item">
                  <Link href="#" className="header__link">Our Approach</Link>
                </li>
                <li className="header__item">
                  <Link href="#" className="header__link">Career</Link>
                </li>
                <li className="header__item">
                  <Link href="#" className="header__link">Contact</Link>
                </li>
                <li className="header__item">
                  <Link href="#" className="header__link _account">Account</Link>
                </li>
              </ul>
            </nav>
            <button className={`menu-btn ${isActive ? '_active' : ''}`} onClick={toggleMenu}>
              {isActive ? <MenuClose /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;