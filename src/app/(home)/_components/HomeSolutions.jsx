"use client";
import React, { useState, useEffect } from "react";
import "@/styles/home/home.scss";
import { fadeInUp } from "@/utils/animations";
import { motion } from "framer-motion";
import Link from "next/link";

const HomeSolutions = () => {

    return (
        <section className="home-solutions">
            <div className="home-solutions__container _container">
                <div className="home-solutions__body">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="home-solutions__title">
                        Comprehensive <span>Solutions</span> for Your Challenges
                    </motion.h2>
                    <div className="home-solutions__content">

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeSolutions;