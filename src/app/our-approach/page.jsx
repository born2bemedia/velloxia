import React from "react";
import "@/styles/approach.scss";
import ApproachHero from "./_components/ApproachHero";
import ApproachSecond from "./_components/ApproachSecond";
import ApproachNeed from "./_components/ApproachNeed";
import ApproachLast from "./_components/ApproachLast";
import ApproachSteps from "./_components/ApproachSteps";
import ApproachStepsMob from "./_components/ApproachStepsMob";

export const metadata = {
  title: "Our Approach | Velloxia",
  description:
    "Learn about our structured approach to delivering effective consulting services tailored to individual needs. Discover how we achieve results.",
  openGraph: {
    title: "Our Approach | Velloxia",
    description:
      "Learn about our structured approach to delivering effective consulting services tailored to individual needs. Discover how we achieve results.",
    images: "https://velloxia.com/images/meta.png",
  },
};

const OurApproach = () => {
  return (
    <div className="approach">
      <ApproachHero />
      <ApproachSecond />
      <ApproachNeed />
      <ApproachSteps />
      <ApproachStepsMob />
      <ApproachLast />
    </div>
  );
};

export default OurApproach;
