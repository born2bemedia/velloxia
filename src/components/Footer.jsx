import React from 'react';
import "@/styles/footer.scss";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__container _container">
        <div className="footer__body">
          <div className="footer__row-01">
            <Link href="/" className="footer__logo"><img src="/logo-white.svg" alt="logo" /></Link>
            <div className="footer__wrapper">
              <div className="footer__col-01">
                <h2 className="footer__title">Zenplex Digital Ltd</h2>
                <div className="footer__text">Business and Marketing Consultancy Leading You to Success.</div>
              </div>
              <div className="footer__col-02">
                <nav className="footer__nav">
                  <ul className="footer__menu-list">
                    <li className="footer__menu-item">
                      <Link href="#" className="footer__menu-link">Business Consulting</Link>
                    </li>
                    <li className="footer__menu-item">
                      <Link href="#" className="footer__menu-link">Account</Link>
                    </li>
                    <li className="footer__menu-item">
                      <Link href="#" className="footer__menu-link">FAQ</Link>
                    </li>
                    <li className="footer__menu-item">
                      <Link href="#" className="footer__menu-link">Our Approach</Link>
                    </li>
                    <li className="footer__menu-item">
                      <Link href="#" className="footer__menu-link">Marketing Consulting</Link>
                    </li>
                    <li className="footer__menu-item">
                      <Link href="#" className="footer__menu-link">Your Cart</Link>
                    </li>
                    <li className="footer__menu-item">
                      <Link href="#" className="footer__menu-link">Insights</Link>
                    </li>
                    <li className="footer__menu-item">
                      <Link href="#" className="footer__menu-link">Contact</Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="footer__col-03">
                <ul className="footer__contacts">
                  <li className="footer__contact">
                    Email:
                    <Link href="#" className="footer__link"></Link>
                  </li>
                  <li className="footer__contact">
                    Phone:
                    <Link href="#" className="footer__link"></Link>
                  </li>
                  <li className="footer__contact">
                    Address:
                    <Link href="#" className="footer__link"></Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer__row-02">
            <nav className="footer__policy">
              <ul className="footer__policy-list">
                <li className="footer__policy-item">
                  <Link href="#" className="footer__policy-link">Terms and Conditions</Link>
                </li>
                <li className="footer__policy-item">
                  <Link href="#" className="footer__policy-link">Privacy Policy</Link>
                </li>
                <li className="footer__policy-item">
                  <Link href="#" className="footer__policy-link">Cookie Policy</Link>
                </li>
                <li className="footer__policy-item">
                  <Link href="#" className="footer__policy-link">Refund Policy</Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="footer__row-03">
            <div className="footer__copy">
              © {currentYear} Zenplex Digital Ltd. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer