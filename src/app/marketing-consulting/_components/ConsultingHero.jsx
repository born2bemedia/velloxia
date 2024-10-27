import Image from "next/image";
import React from "react";

const ConsultingHero = () => {
  return (
    <section className="consulting-hero">
      <div className="_container">
        <div className="consulting-hero__body">
          <h1 className="fadeInUp">
            Building your brand?
            <span>Get it noticed!</span>
          </h1>
          <img src="/images/arrowDown.svg" />
          <div className="images">
            <img src="/images/arrowDownMob.svg" className="arrowDownMob" />
            <Image
              src="/images/marketing-consulting/hero1.png"
              width={410}
              height={244}
              alt="hero1"
            />
            <Image
              src="/images/marketing-consulting/hero2.png"
              width={450}
              height={283}
              alt="hero2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingHero;
