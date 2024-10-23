"use client";
import React, { useState, useEffect } from "react";
import "@/styles/home/home.scss";
import { fadeInUp } from "@/utils/animations";
import { motion } from "framer-motion";
import Link from "next/link";

const HomeMarketing = () => {

    return (
        <section className="home-marketing">
            <div className="home-marketing__container _container">
                <div className="home-marketing__body">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="home-marketing__title">
                        Top Marketing Consulting <span>Services</span>
                    </motion.h2>
                    <div className="home-marketing__content">

                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeMarketing;