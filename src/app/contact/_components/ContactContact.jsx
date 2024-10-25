"use client";
import React, { useState, useEffect } from "react";
import "@/styles/contact.scss";
import { fadeInUp } from "@/utils/animations";
import { motion } from "framer-motion";
import FormContacts from "@/components/FormContacts";

const ContactContact = () => {

    return (
        <section className="contact-contact">
            <div className="contact-contact__container container">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="contact-contact__body">
                    <div className="contact-contact__col-01">
                        <h2 className="contact-contact__title">Connect with <br /> <span>Velloxia</span></h2>
                    </div>
                    <div className="contact-contact__col-02">
                        <div className="contact-contact__form">
                            <FormContacts />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactContact;