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

const slides = [
    {
        number: "01.",
        title: "Business Strategy Development",
        text: "A comprehensive documented strategy that outlines your business goals and the approaches to achieve them.",
        price: "€2,800",
    },
    {
        number: "02.",
        title: "Market Research and Analysis",
        text: "In-depth analysis of market trends and customer preferences to inform business decisions.",
        price: "€3,200",
    },
    {
        number: "03.",
        title: "Financial Forecasting and Budgeting",
        text: "Documented accurate financial forecasts and budgeting plans to guide financial management.",
        price: "€2,000",
    },
];

const HomeMarketing = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const swiperRef = useRef(null);
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
        <section className="home-business">
            <div className="home-business__container _container">
                <div className="home-business__body">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="home-business__title">
                        Top Marketing Consulting <span>Services</span>
                    </motion.h2>
                    <div className="home-business__content">
                        <div className="home-business__wrapper">
                            <div className="home-business__col-01">
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
                                    {slides.map((slide, index) => (
                                        <SwiperSlide key={index} className="home-business-slider__item">
                                            <div className="home-business-slider__wrapper">
                                                <div className="home-business-slider__number">{slide.number}</div>
                                                <h3 className="home-business-slider__title">{slide.title}</h3>
                                                <div className="home-business-slider__text">{slide.text}</div>
                                                <div className="home-business-slider__bottom">
                                                    <div className="home-business-slider__price">{slide.price}</div>
                                                    <Link href="#" className="home-business-slider__order">
                                                        Order
                                                        <ArrowRight />
                                                    </Link>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="home-business__col-02">
                                <div className="home-business__banner">
                                    <Link href="/business-consulting/" className="home-business__more">More services</Link>
                                </div>
                            </div>
                        </div>
                        <div className="home-business-slider__buttons">
                            <button onClick={prevSlide} className="home-business-slider__prev">
                                <ArrowLeft />
                            </button>
                            <button onClick={nextSlide} className="home-business-slider__next">
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