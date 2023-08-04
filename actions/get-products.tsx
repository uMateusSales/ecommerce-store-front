import { Image, Product } from "@/types";

import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  images?: Image[] | undefined;
}

const getProducts = async (query: Query): Promise<Product[]> => {
  const urlWithParams = qs.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      categoryId: query.categoryId,
      sizeId: query.sizeId,
      isFeatured: query.isFeatured,
    },
  });

  const res = await fetch(urlWithParams, { next: { revalidate: 1000 } });

  return res.json();
};

export default getProducts;
