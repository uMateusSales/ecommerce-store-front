import React from "react";

import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/actions/get-billboards";
import ProductList from "@/components/product-list";
import getProducts from "@/actions/get-products";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard("a80061a4-095a-4375-8290-e191a91f92ae");
  const produtos = await getProducts({ isFeatured: true });
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
      </div>
      <div className="flex flex-col gap-y-8 px-4 sm:px=6 lg:px-8">
        <ProductList title="Produtos disponiveis" items={produtos} />
      </div>
    </Container>
  );
};

export default HomePage;
