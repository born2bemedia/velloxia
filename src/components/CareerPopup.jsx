"use client";
import React from "react";
import "@/styles/base.scss";
import { usePopup } from "@/context/PopupsContext";
import ClosePopup from "@/icons/ClosePopup";
import CareerForm from "./CareerForm";

const CareerPopup = () => {
    const { careerPopupDisplay, setCareerPopupDisplay } = usePopup();

    if (!careerPopupDisplay) return null;

    return (
        <div className="popup">
            <div className="popup__container">
                <div className="popup__body">
                    <div className="popup__content">
                        <div className="popup__form">
                            <CareerForm />
                        </div>
                    </div>
                </div>
                <button onClick={() => setCareerPopupDisplay(false)} className="popup__close"><ClosePopup /></button>
            </div>
        </div>
    );
};

export default CareerPopup;