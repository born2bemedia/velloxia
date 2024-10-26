"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ArrowRight from "@/icons/slider/ArrowRight";
import ArrowLeft from "@/icons/slider/ArrowLeft";
import useProductStore from "@/stores/productsStore";
import AddToCartButton from "@/components/AddToCartButton";

const slides = [
  {
    number: "01.",
    title: "Business Planning & Strategy",
    text: "Business Plan Creation, Business Strategy Development, Feasibility Study, Succession Planning",
    price: "€6,500",
  },
  {
    number: "02.",
    title: "Branding & Positioning",
    text: "Business Name and Branding Consultation, Investor Pitch Deck Development, Partnerships and Networking Strategy",
    price: "€5,200",
  },
  {
    number: "03.",
    title: "Legal & Compliance",
    text: "Legal and Compliance Consultation, Compliance Review and Auditing, Expert Consultations",
    price: "€4,500",
  },
  {
    title: "Custom Slide",
  },
];

const HomeTab1 = () => {
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef(null);
  const { fetchProducts, getProductByCategoryHome } =
    useProductStore.getState();
  const [productsArray, setProductsArray] = useState([]);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      await fetchProducts();
      const businessConsultingProducts = getProductByCategoryHome(
        "business-consulting-packs",
        3
      );
      setProductsArray(businessConsultingProducts);
      console.log("productsArray", businessConsultingProducts);
    };

    fetchAndSetProducts();
  }, []);

  const nextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const prevSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slidesForLoop = [...slides, ...slides];

  return (
    <div className="tabs-home__tab tab1">
      <div className="tabs-home__wrapper">
        <h3 className="tabs-home__label">Top business packs</h3>
        <Swiper
          className="home-solutions-slider"
          ref={swiperRef}
          spaceBetween={30}
          loop={true}
          breakpoints={{
            575: { slidesPerView: 1 },
            767: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
        >
          {productsArray.map((product, index) => (
            <SwiperSlide key={index} className="home-solutions-slider__item">
              <div className="home-solutions-slider__wrapper">
                <div className="home-solutions-slider__number">
                  {String(index + 1).padStart(2, "0")}.
                </div>
                <h3 className="home-solutions-slider__title">
                  {product.title}
                </h3>
                <p className="home-solutions-slider__label">Includes:</p>
                <div
                  className="home-solutions-slider__text"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                <div className="home-solutions-slider__bottom">
                  <div className="home-solutions-slider__price">
                    €{product.price}
                  </div>
                  <AddToCartButton product={product} />
                </div>
              </div>
            </SwiperSlide>
          ))}
          <SwiperSlide className="home-solutions-slider__item">
            <div className="home-solutions-slider__custom">
              <Link href="/business-consulting/" className="custom-link">
                More business packs
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="home-solutions-slider__buttons">
          <button onClick={prevSlide} className="home-solutions-slider__prev">
            <ArrowLeft />
          </button>
          <button onClick={nextSlide} className="home-solutions-slider__next">
            <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeTab1;
