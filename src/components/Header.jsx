"use client";

import React, { useState, useEffect } from "react";
import "@/styles/header.scss";
import Link from "next/link";
import CartIcon from "@/icons/CartIcon";
import MenuIcon from "@/icons/MenuIcon";
import MenuClose from "@/icons/MenuClose";
import LangSwitcher from "./LangSwitcher";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const closeMenu = () => {
    setIsActive(false);
  };

  const handleScroll = () => {
    setScrolling(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={scrolling ? "_active" : ""}>
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
            <nav className={`header__nav ${isActive ? "_active" : ""}`}>
              <ul className="header__menu">
                {["business-consulting", "marketing-consulting", "our-approach", "career", "help", "contact", "log-in"].map((path, index) => (
                  <li className="header__item" key={index}>
                    <Link href={`/${path}`} className="header__link" onClick={closeMenu}>
                      {path.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <button className={`menu-btn ${isActive ? "_active" : ""}`} onClick={toggleMenu}>
              {isActive ? <MenuClose /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;