"use client";
import React, { useState, useEffect } from "react";
import "@/styles/career.scss";
import { fadeInUp } from "@/utils/animations";
import { motion } from "framer-motion";
import CareerButton from "@/components/CareerButton";

const CareerApply = () => {

    return (
        <section className="career-apply">
            <div className="career-apply__container _container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="career-apply__body">
                    <img src="/images/career/career-img-03.png" alt="image" className="career-apply__img-01" />
                    <img src="/images/career/career-arrow.svg" alt="arrow" className="career-apply__img-02" />
                    <CareerButton />
                </motion.div>
            </div>
        </section>
    );
};

export default CareerApply;