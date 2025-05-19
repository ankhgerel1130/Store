// @/actions/get-products.ts
import { Product } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
  excludeId?: string;
  name?: string; 
}

const getProducts = async (query: Query = {}): Promise<Product[]> => {
  const url = qs.stringifyUrl(
    {
      url: URL,
      query: {
        colorId: query.colorId,
        sizeId: query.sizeId,
        categoryId: query.categoryId,
        isFeatured: query.isFeatured,
        excludeId: query.excludeId,
        name: query.name ? `%${query.name.toLowerCase()}%` : undefined,
      },
    },
    { skipNull: true }
  );

  const res = await fetch(url);
  return res.json();
};

export default getProducts;