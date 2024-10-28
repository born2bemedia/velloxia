import HomeBusiness from "./_components/HomeBusiness";
import HomeHelp from "./_components/HomeHelp";
import HomeHero from "./_components/HomeHero";
import HomeMarketing from "./_components/HomeMarketing";
import HomeSolutions from "./_components/HomeSolutions";

export const metadata = {
  title: "Business and Marketing Consulting | Velloxia",
  description:
    "Find expert business and marketing solutions designed for individuals at Velloxia. Get personalised consultations and services to boost your personal brand or business goals.",
  openGraph: {
    title: "Business and Marketing Consulting | Velloxia",
    description:
      "Find expert business and marketing solutions designed for individuals at Velloxia. Get personalised consultations and services to boost your personal brand or business goals.",
    images: "https://velloxia.com/images/meta.png",
  },
};

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeBusiness />
      <HomeMarketing />
      <HomeSolutions />
      <HomeHelp />
    </>
  );
}
