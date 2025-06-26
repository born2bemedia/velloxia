import PlusIcon from "@/icons/PlusIcon";
import React, { useState } from "react";

const FaqAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };
  return (
    <div className="faq-accordion">
      <div className={`item ${activeIndex === 1 ? "active" : ""}`} onClick={() => toggleAccordion(1)}>
        <div className="accordion-title" >
          <span>
            Do you offer services beyond what's listed on your website?
          </span>
          <PlusIcon />
        </div>
        {activeIndex === 1 && (
          <div className="accordion-content">
            <p>
              Absolutely. You can contact us directly or order a Common Expert
              Consultation to discuss your specific case and receive tailored
              assistance.
            </p>
          </div>
        )}
      </div>
      <div className={`item ${activeIndex === 2 ? "active" : ""}`} onClick={() => toggleAccordion(2)}>
        <div className="accordion-title" >
          <span>What if I'm not satisfied with your solution?</span>
          <PlusIcon />
        </div>
        {activeIndex === 2 && (
          <div className="accordion-content">
            <p>
              We value transparency and open communication. If you're
              unsatisfied with our solution, let us know what doesn't work for
              you, and we'll make the necessary adjustments to fit your needs
              better.
            </p>
          </div>
        )}
      </div>
      <div className={`item ${activeIndex === 3 ? "active" : ""}`} onClick={() => toggleAccordion(3)}>
        <div className="accordion-title" >
          <span>What if your solution doesn't work in my market?</span>
          <PlusIcon />
        </div>
        {activeIndex === 3 && (
          <div className="accordion-content">
            <p>
              Markets are constantly evolving, and successful businesses must
              adapt to these changes. We offer ongoing support to help you
              navigate dynamic environments. Our solutions are designed for
              flexibility, allowing for continued cooperation and adjustments as
              needed.
            </p>
          </div>
        )}
      </div>
      <div className={`item ${activeIndex === 4 ? "active" : ""}`} onClick={() => toggleAccordion(4)}>
        <div className="accordion-title" >
          <span>What can I expect as a result of a consultation?</span>
          <PlusIcon />
        </div>
        {activeIndex === 4 && (
          <div className="accordion-content">
            <p>
              You'll receive detailed documentation, such as market research,
              business strategies with step-by-step implementation plans,
              financial forecasts, and other actionable insights that guide your
              next steps with clarity.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaqAccordion;
