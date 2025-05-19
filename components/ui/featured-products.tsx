"use client";

import { useState } from "react";
import ProductList from "@/components/product-list";
import { Product } from "@/types";

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="px-6 sm:px-8 lg:px-12 mb-24">
      <div className="pt-8 mb-12">
        <h2 className="text-3xl font-extralight tracking-[0.1em] uppercase text-neutral-800 border-b border-neutral-300 pb-3">
          FEATURED PRODUCTS
        </h2>
      </div>
      <ProductList
        items={visibleProducts}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12"
      />
      {visibleCount < products.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={handleShowMore}
            className="text-black text-sm font-bold tracking-[0.15em] uppercase bg-transparent border border-black px-8 py-3 hover:bg-black hover:text-white transition duration-300"
          >
            MORE
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedProducts;