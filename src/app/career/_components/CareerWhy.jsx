"use client";
import React, { useState, useRef } from "react";
import "@/styles/career.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ArrowLeft from "@/icons/slider/ArrowLeft";
import ArrowRight from "@/icons/slider/ArrowRight";

const slides = [
    {
        icon: "/images/career/career-icon-01.svg",
        title: "Flexible Work Arrangements",
        text: "Enjoy the freedom to work from home and maintain a healthy work-life balance.",
    },
    {
        icon: "/images/career/career-icon-02.svg",
        title: "Paid Leave",
        text: "Benefit from a generous paid leave policy, ensuring time for personal and family needs.",
    },
    {
        icon: "/images/career/career-icon-03.svg",
        title: "Comprehensive Benefits Package",
        text: "Access a well-rounded benefits package that supports your health and wellness.",
    },
    {
        icon: "/images/career/career-icon-04.svg",
        title: "Professional Development",
        text: "Engage in continuous learning through workshops, training, and skill development programs.",
    },
    {
        icon: "/images/career/career-icon-05.svg",
        title: "Collaborative Team Environment",
        text: "Work alongside a supportive and innovative team that values your contributions.",
    },
    {
        icon: "/images/career/career-icon-06.svg",
        title: "Career Growth Potential",
        text: "Explore pathways for career advancement within a dynamic and expanding organisation.",
    },
];

const CareerWhy = () => {
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
        <section className="career-why">
            <div className="career-why__container _container">
                <div className="career-why__body">
                    <h2 className="career-why__title">Why Work With Us?</h2>
                    <Swiper
                        className="career-why-slider"
                        ref={swiperRef}
                        modules={[Navigation]}
                        spaceBetween={24}
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
                            <SwiperSlide key={index} className="career-why-slider__item">
                                <div className="career-why-slider__wrapper">
                                    <img
                                        src={slide.icon}
                                        alt="icon"
                                        className="career-why-slider__icon"
                                    />
                                    <h3 className="career-why-slider__title">{slide.title}</h3>
                                    <div className="career-why-slider__text">{slide.text}</div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="career-why-slider__buttons">
                        <button onClick={prevSlide} className="career-why-slider__prev">
                            <ArrowLeft />
                        </button>
                        <button onClick={nextSlide} className="career-why-slider__next">
                            <ArrowRight />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareerWhy;
