"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css"; // Swiper styles
import Image from "next/image";

const ApproachStepsMob = () => {
  return (
    <section className="approach-steps-mob">
      <div className="_container">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: ".arrow-prev",
            nextEl: ".arrow-next",
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay settings
          loop={true}
          effect="slide"
        >
          <SwiperSlide>
            <div className="slide">
              <span className="number">01.</span>
              <h3>We review your order <br/>and contact you <br/>for details.</h3>
              <p>
                You will get a brief that will help us to discover your needs.
              </p>
              <div className="divider">
                <span className="green"></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="arrows">
                <img
                  className="arrow-prev"
                  src="/images/arrowPrev.svg"
                  alt="Previous"
                />
                <img
                  className="arrow-next"
                  src="/images/arrowNext.svg"
                  alt="Next"
                />
              </div>
              <div className="image">
                <Image
                  width={388}
                  height={422}
                  src="/images/approach/step1.png"
                  alt="step1"
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide">
              <span className="number">02.</span>
              <h3>
                We assemble a team of experts to cover each aspect of your
                challenge.
              </h3>
              <p>
                Only the best business and marketing minds will work for you.
              </p>
              <div className="divider">
                <span></span>
                <span className="green"></span>
                <span></span>
                <span></span>
              </div>
              <div className="arrows">
                <img
                  className="arrow-prev"
                  src="/images/arrowPrev.svg"
                  alt="Previous"
                />
                <img
                  className="arrow-next"
                  src="/images/arrowNext.svg"
                  alt="Next"
                />
              </div>
              <div className="image">
                <Image
                  width={388}
                  height={422}
                  src="/images/approach/step2.png"
                  alt="step2"
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide">
              <span className="number">03.</span>
              <h3>Necessary consulting <br/>sessions are <br/>scheduled.</h3>
              <p>We provide <br/>our solutions.</p>
              <div className="divider">
                <span></span>
                <span></span>
                <span className="green"></span>
                <span></span>
              </div>
              <div className="arrows">
                <img
                  className="arrow-prev"
                  src="/images/arrowPrev.svg"
                  alt="Previous"
                />
                <img
                  className="arrow-next"
                  src="/images/arrowNext.svg"
                  alt="Next"
                />
              </div>
              <div className="image">
                <Image
                  width={388}
                  height={422}
                  src="/images/approach/step3.png"
                  alt="step3"
                />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide">
              <span className="number">04.</span>
              <h3>
                You get all the necessary documentation so you can follow and
                consult it.
              </h3>
              <p>You can get our professional guidance in implementation.</p>
              <div className="divider">
                <span></span>
                <span></span>
                <span></span>
                <span className="green"></span>
              </div>
              <div className="arrows">
                <img
                  className="arrow-prev"
                  src="/images/arrowPrev.svg"
                  alt="Previous"
                />
                <img
                  className="arrow-next"
                  src="/images/arrowNext.svg"
                  alt="Next"
                />
              </div>
              <div className="image">
                <Image
                  width={388}
                  height={422}
                  src="/images/approach/step4.png"
                  alt="step4"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default ApproachStepsMob;
