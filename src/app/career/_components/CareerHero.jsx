"use client";
import React, { useState, useEffect } from "react";
import "@/styles/career.scss";
import { fadeInUp } from "@/utils/animations";
import { motion } from "framer-motion";

const CareerHero = () => {

    return (
        <section className="career-hero">
            <div className="career-hero__container _container">
                <div className="career-hero__body">
                    <motion.h1
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="career-hero__title">
                        Your Next Opportunity <br/>
                        <span>Starts Here</span>
                    </motion.h1>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        custom={0.2}
                        className="career-hero__content">
                        <img src="/images/career/career-img-01.png" alt="image" className="career-hero__img-01" />
                        <img src="/images/career/career-img-02.png" alt="image" className="career-hero__img-02" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CareerHero;