import CareerApply from "./_components/CareerApply";
import CareerHero from "./_components/CareerHero";
import CareerWhy from "./_components/CareerWhy";

export const metadata = {
    title: "Career | Velloxia",
    description:
        "Join our team at Velloxia! Explore career opportunities and submit your CV to become part of a dynamic and innovative company.",
    openGraph: {
        title: "Career | Velloxia",
        description:
            "Join our team at Velloxia! Explore career opportunities and submit your CV to become part of a dynamic and innovative company.",
        images: "https://velloxia.com/images/meta.png",
    },
};

export default function Career() {
    return (
        <>
            <CareerHero />
            <CareerWhy />
            <CareerApply />
        </>
    );
}
