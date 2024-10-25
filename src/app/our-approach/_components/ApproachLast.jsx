import Link from "next/link";
import React from "react";

const ApproachLast = () => {
  return (
    <section className="approach-need ">
      <div className="approach-need__container _container">
        <div className="approach-need__body last">
          <div className="approach-need__content">
            <h2 className="approach-need__title">
              Our work is not just <br />
              words. Let’s go!
            </h2>
            <div className="approach-need__buttons">
              <Link href="/contact" className="approach-need__link">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachLast;
