// src/components/CareerButton.jsx
import React from "react";
import { usePopup } from "@/context/PopupsContext";

const CareerButton = () => {
  const { setCareerPopupDisplay } = usePopup();

  return (
    <button onClick={() => setCareerPopupDisplay(true)} className="career-apply__link">
      Apply Now
    </button>
  );
};

export default CareerButton;