"use client";

import Image from "next/image";
import { X } from "lucide-react";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { motion } from "framer-motion";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const nameVariants = {
    rest: { scale: 1, color: "#1a1a1a" },
    hover: {
      scale: 1.02,
      color: "#0a0a0a",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="flex py-8 border-b border-neutral-200/30 transition-all duration-300 hover:bg-neutral-50/30 font-futura"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative h-1000 w-40 sm:h-60 sm:w-60 overflow-hidden shadow-sm border border-neutral-200/20">
        <Image
          fill
          src={data.images[0].url}
          alt={data.name}
          className="object-cover object-center transition-transform duration-700 hover:scale-103"
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-900/5" />
      </div>

      <div className="relative ml-10 flex flex-1 flex-col justify-between">
        <motion.button
          onClick={onRemove}
          className="absolute z-10 right-0 top-0 p-2 text-neutral-500 hover:text-neutral-900 transition-colors duration-200"
          aria-label="Remove item"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X size={14} className="stroke-[1.2]" />
        </motion.button>

        <div className="pr-20 pt-6">
          <motion.h3
            className="relative text-lg font-normal tracking-[0.14em] text-neutral-900 uppercase leading-tight"
            variants={nameVariants}
            initial="rest"
            whileHover="hover"
          >
            {data.name}
            <motion.span
              className="absolute left-0 bottom-[-4px] h-[1px] bg-gradient-to-r from-transparent via-[#B7C9B5] to-transparent"
              initial={{ width: "0%" }}
              whileHover={{ width: "100%", transition: { duration: 0.4, ease: "easeOut" } }}
            />
          </motion.h3>

          {/* Description - Added below product name */}
          {data.description && (
            <motion.p 
              className="mt-2 text-xs font-light text-neutral-600 tracking-[0.02em] line-clamp-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {data.description}
            </motion.p>
          )}

<div className="mt-4 flex items-center gap-10 overflow-x-auto whitespace-nowrap">
  <div className="flex items-center gap-3 shrink-0">
    <span className="text-[11px] font-medium text-neutral-600 tracking-[0.1em] uppercase">
      Color
    </span>
    <div className="flex items-center gap-2">
      <motion.span
        className="text-[11px] font-light text-neutral-700 capitalize"
        whileHover={{ color: "#B7C9B5" }}
      >
        {data.color.name}
      </motion.span>
      <motion.div
        className="w-3 h-3 rounded-full border border-neutral-300/30 shadow-sm"
        style={{ backgroundColor: data.color.value }}
        whileHover={{
          scale: 1.15,
          boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
        }}
        role="img"
        aria-label={`Color: ${data.color.name}`}
      />
    </div>
  </div>

  <div className="flex items-center gap-3 shrink-0">
    <span className="text-[11px] font-medium text-neutral-600 tracking-[0.1em] uppercase">
      Size:
    </span>
    <motion.span
      className="text-[11px] font-light text-neutral-700 uppercase"
      whileHover={{ color: "#B7C9B5" }}
    >
      {data.size.value} ({data.size.name})
    </motion.span>
  </div>
</div>


          {/* Quality Indicator - Added below size/color */}
          {data.quality && (
            <div className="mt-3 flex items-center space-x-3">
              <span className="text-[11px] font-medium text-neutral-600 tracking-[0.1em] uppercase">
                Quality:
              </span>
              <div className="flex items-center gap-2">
                <div className="relative w-20 bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
                    style={{ width: `${data.quality}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${data.quality}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"></div>
                  </motion.div>
                </div>
                <span className="text-[11px] font-medium text-amber-700">
                  {data.quality}/100
                </span>
              </div>
            </div>
          )}

          <motion.hr
            className="my-4 border-t border-neutral-200/30"
            style={{
              background: "linear-gradient(to right, transparent, #e2e1df, transparent)",
            }}
            variants={itemVariants}
          />

          <motion.div whileHover={{ x: 2 }}>
            <Currency
              value={data.price}
              className="text-base font-medium tracking-[0.1em] text-neutral-900 uppercase"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;