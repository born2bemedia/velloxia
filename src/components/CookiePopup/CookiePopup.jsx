"use client";
import { useState, useEffect } from "react";
import styles from "./CookiePopup.module.scss";
import classNames from "classnames";

const CookiePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  const handleDecline = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={classNames(styles.cookiePopup, {
        [styles.visible]: isVisible,
      })}
    >
      <div className={styles.content}>
        <h2>Cookie settings</h2>
        <p>
          To improve your browsing experience, we use cookies. By continuing to
          use this website, you consent to our cookie policy. Please check our{" "}
          <a href="/cookie-policy">Cookie Policy</a>{" "}for more details.
        </p>
      </div>
      <div className={styles.buttons}>
        <button onClick={handleDecline} className={classNames(styles.decline)}>
          Decline
        </button>
        <button onClick={handleAccept} className={classNames(styles.accept)}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookiePopup;
