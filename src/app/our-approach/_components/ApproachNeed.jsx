import Link from "next/link";
import React from "react";

const ApproachNeed = () => {
  return (
    <section className="approach-need">
      <div className="approach-need__container _container">
        <div className="approach-need__body">
          <div className="approach-need__content">
            <h2 className="approach-need__title">I need:</h2>
            <div className="approach-need__buttons">
              <Link href="/business-consulting" className="approach-need__link">
                Business Consulting
              </Link>
              <Link
                href="/marketing-consulting"
                className="approach-need__link"
              >
                Marketing Consulting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachNeed;
