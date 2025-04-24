"use client";
import { useEffect, useState, useRef } from "react";
import Script from "next/script";

const GTranslateSwitcher = () => {
  const [currentLang, setCurrentLang] = useState("EL");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Set default language cookie if not already set
    if (!document.cookie.includes("googtrans")) {
      document.cookie =
        "googtrans=/en/el;path=/;domain=" + window.location.hostname;
      setCurrentLang("EL");
    } else {
      // Get current language from cookie
      const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
      if (match && match[1]) {
        setCurrentLang(match[1].toUpperCase());
      }
    }
  }, []);

  useEffect(() => {
    // Handle clicks outside the dropdown to close it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (language, languageCode) => {
    // Set the cookie directly
    document.cookie = `googtrans=/en/${language};path=/;domain=${window.location.hostname}`;

    // Update the current language state
    setCurrentLang(languageCode);
    setIsDropdownOpen(false);

    // Force a page reload to apply the translation
    window.location.reload();
  };

  return (
    <div
      ref={dropdownRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      <div className="gtranslate_wrapper">
        <img
          width={28}
          height={20}
          src={`/images/${currentLang}.svg`}
          alt={currentLang}
          style={{ cursor: "pointer" }}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
      </div>

      {isDropdownOpen && (
        <ul
          translate="no"
          style={{
            position: "absolute",
            top: "40px",
            left: "-16px",
            zIndex: 10000,
            backgroundColor: "#000000D9",
            listStyle: "none",
            padding: "16px",
            margin: 0,
            border: "1px solid rgba(255, 255, 255, 0.05)",
            borderRadius: "5px",
            width: "130px",
          }}
        >
          <li
            onClick={() => handleLanguageChange("en", "EN")}
            style={{
              padding: "7px 0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#fff",
            }}
          >
            <img width={28} height={20} src="/images/EN.svg" />
            English
          </li>
          <li
            onClick={() => handleLanguageChange("de", "DE")}
            style={{
              padding: "7px 0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#fff",
            }}
          >
            <img width={28} height={20} src="/images/DE.svg" />
            German
          </li>
          <li
            onClick={() => handleLanguageChange("it", "IT")}
            style={{
              padding: "7px 0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#fff",
            }}
          >
            <img width={28} height={20} src="/images/IT.svg" />
            Italian
          </li>
          <li
            onClick={() => handleLanguageChange("el", "EL")}
            style={{
              padding: "7px 0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#fff",
            }}
          >
            <img width={28} height={20} src="/images/EL.svg" />
            Greek
          </li>
        </ul>
      )}

      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      <Script id="gtranslate-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'en',
              includedLanguages: 'en,de,it,el',
              layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            }, 'gtranslate_wrapper');
          }
        `}
      </Script>
      <div id="google_translate_element" style={{ display: "none" }}></div>
    </div>
  );
};

export default GTranslateSwitcher;
