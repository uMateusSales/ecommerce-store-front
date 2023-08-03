import { Product } from "@/types";
import React from "react";
import NoResults from "./ui/no-results";

import ProductContainer from "./ui/product-container";

interface ProductListProps {
  title: string;
  items: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, items }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResults />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((i) => (
          <ProductContainer key={i.id} data={i} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
