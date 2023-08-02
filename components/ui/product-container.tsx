"use client";

import { Product } from "@/types";
import Image from "next/image";

interface ProductContainerProps {
  data: Product;
}

const ProductContainer: React.FC<ProductContainerProps> = ({ data }) => {
  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image src={data?.images?.[0]?.url} fill alt="image" />
      </div>
    </div>
  );
};

export default ProductContainer;
