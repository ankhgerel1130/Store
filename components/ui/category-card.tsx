"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import Currency from "@/components/ui/currency";
import { ShoppingCart } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";

interface CategoryCardProps {
  data: Product;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ data }) => {
  const router = useRouter();
  const cart = useCart();

  const handleClick = () => {
    router.push(`/product/${data.id}`);
  };

  const onAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    cart.addItem(data);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden ">
        <Image
          src={data.images?.[0]?.url}
          alt={data.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-sm font-medium text-neutral-800 line-clamp-1">
          {data.name}
        </h3>
        <p className="text-xs text-neutral-500 uppercase tracking-wide">
          {data.category?.name} — {data.size?.name}
        </p>
        <div className="flex items-center justify-between mt-2">
          <Currency value={data.price} className="text-base font-semibold" />
          <IconButton
            onClick={onAddToCart}
            icon={<ShoppingCart size={16} />}
            className="p-1 border border-neutral-300 hover:bg-neutral-100 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
