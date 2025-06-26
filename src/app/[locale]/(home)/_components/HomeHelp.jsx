"use client";
import React, { useState, useEffect } from "react";
import "@/styles/home/home.scss";
import { fadeInUp } from "@/utils/animations";
import { motion } from "framer-motion";
import Link from "next/link";

const HomeHelp = () => {

    return (
        <section className="home-help">
            <div className="home-help__container _container">
                <div className="home-help__body">
                    <div className="home-help__content">
                        <motion.h2
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="home-help__title">
                            Need Help?
                        </motion.h2>
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            custom={0.2}
                            className="home-help__buttons">
                            <Link href="/help" className="home-help__link">Visit Help Section</Link>
                            <Link href="/contact" className="home-help__link">Contact</Link>
                        </motion.div> 
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHelp;