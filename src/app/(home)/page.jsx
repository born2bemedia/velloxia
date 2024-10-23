import HomeBusiness from "./_components/HomeBusiness";
import HomeHelp from "./_components/HomeHelp";
import HomeHero from "./_components/HomeHero";
import HomeMarketing from "./_components/HomeMarketing";
import HomeSolutions from "./_components/HomeSolutions";

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
