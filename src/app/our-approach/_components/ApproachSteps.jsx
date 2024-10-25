"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const ApproachSteps = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderWrapperRef = useRef(null);
  const sliderContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sliderWrapperRef.current || !sliderContainerRef.current) {
        return;
      }

      const titles = document.querySelectorAll(".steps__slider-titles li");
      const totalSlides = titles.length;

      // Get the total height of the wrapper and calculate per-slide scroll range
      const wrapperHeight = sliderWrapperRef.current.scrollHeight;
      const sliderStart = sliderWrapperRef.current.offsetTop;
      const scrollPerSlide = wrapperHeight / totalSlides;

      // Get the current scroll position
      const scrollY = window.scrollY;

      // Check if we are in the sticky section
      if (scrollY >= sliderStart && scrollY <= sliderStart + wrapperHeight) {
        // Calculate the active slide based on scroll position
        const activeSlide = Math.min(
          totalSlides - 1,
          Math.floor((scrollY - sliderStart) / scrollPerSlide)
        );

        // Only update if the currentIndex changes
        if (activeSlide !== currentIndex) {
          setCurrentIndex(activeSlide);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentIndex]);

  return (
    <section className="approach-steps">
      <div className="_container">
        <div className="steps__slider-wrapper" ref={sliderWrapperRef}>
          <div className="steps__slider" ref={sliderContainerRef}>
            <div className="steps__slider-left">
              <div className="steps__image-container">
                <Image
                  width={388}
                  height={422}
                  src="/images/approach/step1.png"
                  className={`steps__slider-image ${
                    currentIndex === 0 ? "active" : ""
                  }`}
                  alt="step1"
                />
                <Image
                  width={388}
                  height={422}
                  src="/images/approach/step2.png"
                  className={`steps__slider-image ${
                    currentIndex === 1 ? "active" : ""
                  }`}
                  alt="step2"
                />
                <Image
                  width={388}
                  height={422}
                  src="/images/approach/step3.png"
                  className={`steps__slider-image ${
                    currentIndex === 2 ? "active" : ""
                  }`}
                  alt="step3"
                />
                <Image
                  width={388}
                  height={422}
                  src="/images/approach/step4.png"
                  className={`steps__slider-image ${
                    currentIndex === 3 ? "active" : ""
                  }`}
                  alt="step4"
                />
              </div>
            </div>

            <div className="steps__slider-right">
              <ul className="steps__slider-titles">
                <li
                  className={currentIndex === 0 ? "active" : ""}
                  data-slide="0"
                >
                  <span className="number"><span>01.</span></span>
                  <div className="content">
                    <h3>We review your order and contact you for details. </h3>
                    <p className="description">
                      You will get a brief that will help us to discover your
                      needs.
                    </p>
                  </div>
                </li>
                <li
                  className={currentIndex === 1 ? "active" : ""}
                  data-slide="1"
                >
                  <span className="number"><span>02.</span></span>
                  <div className="content">
                    <h3>
                      We assemble a team of experts to cover each aspect of your
                      challenge.
                    </h3>
                    <p className="description">
                      Only the best business and marketing minds will work for
                      you.
                    </p>
                  </div>
                </li>
                <li
                  className={currentIndex === 2 ? "active" : ""}
                  data-slide="2"
                >
                  <span className="number"><span>03.</span></span>
                  <div className="content">
                    <h3>Necessary consulting sessions are scheduled.</h3>
                    <p className="description">We provide our solutions.</p>
                  </div>
                </li>
                <li
                  className={currentIndex === 3 ? "active" : ""}
                  data-slide="3"
                >
                  <span className="number"><span>04.</span></span>
                  <div className="content">
                    <h3>
                      You get all the necessary documentation so you can follow
                      and consult it.
                    </h3>
                    <p className="description">
                      You can get our professional guidance in implementation.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSteps;
