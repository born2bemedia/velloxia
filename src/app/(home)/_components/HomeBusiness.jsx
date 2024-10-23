"use client";
import React, { useState, useEffect } from "react";
import "@/styles/home/home.scss";
import { fadeInUp } from "@/utils/animations";
import { motion } from "framer-motion";
import Link from "next/link";

const HomeBusiness = () => {

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
                        Top Business Consulting <span>Services</span>
                    </motion.h2>
                    <div className="home-business__content">

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeBusiness;