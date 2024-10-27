import React from "react";
import "@/styles/help.scss";
import HelpHero from "./_components/HelpHero";
import HelpTabs from "./_components/HelpTabs";

export const metadata = {
  title: "Help and FAQs | Velloxia",
  description:
    "Find answers to your questions and get assistance with our services. Explore FAQs and insights to support your journey with Velloxia.",
  openGraph: {
    title: "Help and FAQs | Velloxia",
    description:
      "Find answers to your questions and get assistance with our services. Explore FAQs and insights to support your journey with Velloxia.",
    images: "https://velloxia.com/images/meta.png",
  },
};

const Help = () => {
  return (
    <>
      <HelpHero />
      <HelpTabs />
    </>
  );
};

export default Help;
