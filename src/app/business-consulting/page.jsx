import React from "react";
import "@/styles/business-consulting.scss";
import ConsultingHero from "./_components/ConsultingHero";
import useProductStore from "@/stores/productsStore";
import ProductsWrap from "./_components/ProductsWrap";
import PacksWrap from "./_components/PacksWrap";

const BusinessConsulting = async () => {
  const { fetchProducts, getProductByCategory } = useProductStore.getState();

  await fetchProducts();

  const businessConsultingProducts = getProductByCategory(
    "business-consulting-products"
  );
  const businessConsultingPacks = getProductByCategory(
    "business-consulting-packs"
  );

  return (
    <>
      <ConsultingHero />
      <ProductsWrap products={businessConsultingProducts} />
      <PacksWrap products={businessConsultingPacks} title="Business Packs" />
    </>
  );
};

export default BusinessConsulting;
