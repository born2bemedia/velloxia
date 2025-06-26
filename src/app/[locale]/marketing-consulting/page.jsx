import React from "react";
import "@/styles/marketing-consulting.scss";
import ConsultingHero from "./_components/ConsultingHero";
import useProductStore from "@/stores/productsStore";
import ProductsWrap from "./_components/ProductsWrap";
import PacksWrap from "./_components/PacksWrap";

export const metadata = {
  title: "Marketing Consulting Services and Packs | Velloxia",
  description:
    "Professional marketing consulting services for individuals. Get personalised strategies to grow your brand and reach your audience.",
  openGraph: {
    title: "Marketing Consulting Services and Packs | Velloxia",
    description:
      "Professional marketing consulting services for individuals. Get personalised strategies to grow your brand and reach your audience.",
    images: "https://velloxia.com/images/meta.png",
  },
};

const BusinessConsulting = async () => {
  const { fetchProducts, getProductByCategory } = useProductStore.getState();

  await fetchProducts();

  const businessConsultingProducts = getProductByCategory(
    "marketing-consulting-products"
  );
  const businessConsultingPacks = getProductByCategory(
    "marketing-consulting-packs"
  );

  console.log(businessConsultingProducts);


  return (
    <>
      <ConsultingHero />
      <ProductsWrap products={businessConsultingProducts} />
      <PacksWrap products={businessConsultingPacks} title="Marketing Packs" />
    </>
  );
};

export default BusinessConsulting;
