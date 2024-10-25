"use client";
import React, { useState, useEffect, useRef } from "react"; // Добавлен useRef
import "@/styles/home/home.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { fadeInUp } from "@/utils/animations";
import { motion } from "framer-motion";
import Link from "next/link";
import ArrowLeft from "@/icons/slider/ArrowLeft";
import ArrowRight from "@/icons/slider/ArrowRight";
import useProductStore from "@/stores/productsStore";
import AddToCartButton from "@/components/AddToCartButton";

const slides = [
  {
    number: "01.",
    title: "Content Marketing Strategy",
    text: "A documented content marketing plan that builds your brand, drives engagement, and increases organic traffic through blogs, videos, and more.",
    price: "€1,800",
  },
  {
    number: "02.",
    title: "Brand Messaging & Positioning",
    text: "Development of clear and consistent brand messaging that resonates with your audience and strengthens your market position.",
    price: "€2,100",
  },
  {
    number: "03.",
    title: "Digital Advertising Audit",
    text: "A thorough review of existing digital ad campaigns to identify areas of improvement and optimise performance.",
    price: "€3,000",
  },
];

const HomeMarketing = () => {
  const { fetchProducts, getProductByCategoryHome } =
    useProductStore.getState();
  const [productsArray, setProductsArray] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      await fetchProducts();
      const businessConsultingProducts = getProductByCategoryHome(
        "marketing-consulting-products",
        3
      );
      setProductsArray(businessConsultingProducts);
      console.log("productsArray", businessConsultingProducts);
    };

    fetchAndSetProducts();
  }, []);

  const nextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const prevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <section className="home-marketing">
      <div className="home-marketing__container _container">
        <div className="home-marketing__body">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="home-marketing__title"
          >
            Top Marketing Consulting <span>Services</span>
          </motion.h2>
          <div className="home-marketing__content">
            <div className="home-marketing__wrapper">
              <div className="home-marketing__col-01">
                <Swiper
                  className="home-business-slider"
                  ref={swiperRef}
                  modules={[Navigation]}
                  spaceBetween={20}
                  loop={true}
                  onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
                  breakpoints={{
                    575: {
                      slidesPerView: 1,
                    },
                    767: {
                      slidesPerView: 2,
                    },
                    1200: {
                      slidesPerView: 3,
                    },
                  }}
                >
                  {productsArray.map((product, index) => (
                    <SwiperSlide
                      key={index}
                      className="home-business-slider__item"
                    >
                      <div className="home-business-slider__wrapper">
                        <div className="home-business-slider__number">
                          {String(index + 1).padStart(2, "0")}.
                        </div>
                        <h3 className="home-business-slider__title">
                          {product.title}
                        </h3>
                        <div
                          className="home-business-slider__text"
                          dangerouslySetInnerHTML={{
                            __html: product.description,
                          }}
                        />
                        <div className="home-business-slider__bottom">
                          <div className="home-business-slider__price">
                            €{product.price}
                          </div>
                          <AddToCartButton product={product} />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="home-marketing__col-02">
                <div className="home-marketing__banner">
                  <Link
                    href="/marketing-consulting/"
                    className="home-marketing__more"
                  >
                    More services
                  </Link>
                </div>
              </div>
            </div>
            <div className="home-marketing-slider__buttons">
              <button
                onClick={prevSlide}
                className="home-marketing-slider__prev"
              >
                <ArrowLeft />
              </button>
              <button
                onClick={nextSlide}
                className="home-marketing-slider__next"
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeMarketing;
