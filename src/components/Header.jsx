import React from "react";
import "@/styles/header.scss";
import Link from "next/link";
import CartIcon from "@/icons/CartIcon";
import MenuIcon from "@/icons/MenuIcon";

const Header = () => {
  return (
    <header>
      <div className="_container">
        <div className="menu-row">
          <Link href="/">
            <img src="/logo.svg" />
          </Link>
          <div className="actions">
            <Link href="#" className="cart">
              <CartIcon />
            </Link>
            <span></span>
            <button className="menu-btn">
              <MenuIcon />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
