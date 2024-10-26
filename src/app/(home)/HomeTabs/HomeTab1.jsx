"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ArrowRight from "@/icons/slider/ArrowRight";
import ArrowLeft from "@/icons/slider/ArrowLeft";

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
                    {slidesForLoop.map((slide, index) => (
                        <SwiperSlide key={index} className="home-solutions-slider__item">
                            {/* Кастомный слайд */}
                            {slide.title === "Custom Slide" ? (
                                <div className="home-solutions-slider__custom">
                                    <Link href="/business-consulting/" className="custom-link">
                                        More business packs
                                    </Link>
                                </div>
                            ) : (
                                /* Верстка для товаров */
                                <div className="home-solutions-slider__wrapper">
                                    <div className="home-solutions-slider__number">{slide.number}</div>
                                    <h3 className="home-solutions-slider__title">{slide.title}</h3>
                                    <p className="home-solutions-slider__label">Includes:</p>
                                    <ul className="home-solutions-slider__text">
                                        {slide.text.split(', ').map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                    <div className="home-solutions-slider__bottom">
                                        <div className="home-solutions-slider__price">{slide.price}</div>
                                        <Link href="#" className="home-solutions-slider__order">
                                            Order
                                            <ArrowRight />
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
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