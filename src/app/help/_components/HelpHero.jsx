import Image from "next/image";
import React from "react";

const HelpHero = () => {
  return (
    <section className="help-hero">
      <div className="_container">
        <div className="help-hero__body">
          <h1 className="fadeInUp">
            Common Questions,
            <span>Clear Answers</span>
          </h1>
          <div className="images">
            <img src="/images/arrowDownMob.svg" className="arrowDownMob" />

            <Image
              src="/images/help/hero1.png"
              width={450}
              height={283}
              alt="hero2"
            />
            <Image
              src="/images/help/hero2.png"
              width={410}
              height={244}
              alt="hero1"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpHero;
