import React from "react";
import "@/styles/marketing-consulting.scss";
import ConsultingHero from "./_components/ConsultingHero";
import useProductStore from "@/stores/productsStore";
import ProductsWrap from "./_components/ProductsWrap";
import PacksWrap from "./_components/PacksWrap";

const BusinessConsulting = async () => {
  const { fetchProducts, getProductByCategory } = useProductStore.getState();

  await fetchProducts();

  const businessConsultingProducts = getProductByCategory(
    "marketing-consulting-products"
  );
  const businessConsultingPacks = getProductByCategory(
    "marketing-consulting-packs"
  );

  //console.log(businessConsultingProducts);

  return (
    <>
      <ConsultingHero />
      <ProductsWrap products={businessConsultingProducts} />
      <PacksWrap products={businessConsultingPacks} title="Marketing Packs" />
    </>
  );
};

export default BusinessConsulting;
