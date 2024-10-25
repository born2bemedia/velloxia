import React from "react";
import "@/styles/approach.scss";
import ApproachHero from "./_components/ApproachHero";
import ApproachSecond from "./_components/ApproachSecond";
import ApproachNeed from "./_components/ApproachNeed";
import ApproachLast from "./_components/ApproachLast";
import ApproachSteps from "./_components/ApproachSteps";
import ApproachStepsMob from "./_components/ApproachStepsMob";

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
