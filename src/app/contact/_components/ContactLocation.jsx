"use client";
import React, { useState, useEffect } from "react";
import "@/styles/contact.scss";
import { fadeInUp } from "@/utils/animations";
import { motion } from "framer-motion";
import Link from "next/link";
import Address from "@/icons/Address";

const ContactLocation = () => {

    return (
        <section className="contact-location">
            <div className="contact-location__container container">
                <div className="contact-location__body">
                    <div className="contact-location__col-01">
                        <h2 className="contact-location__title">Our <span>Location:</span></h2>
                    </div>
                    <div className="contact-location__col-02">
                        <div className="contact-location__items">
                            <div className="contact-location__address">
                                <div className="contact-location__icon">
                                    <Address />
                                </div>
                                <div className="contact-location__block">
                                    <h3 className="contact-location__label">Address</h3>
                                    <Link href="#" className="contact-location__link">Address</Link>
                                </div>
                            </div>
                            <div className="contact-location__map">
                                <h3 className="contact-location__label">Find us here:</h3>
                                <div className="contact-location__test"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactLocation;