"use client";

import Currency from "@/components/ui/currency";
import { Product } from "@/types";
import Button from "./ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { motion } from "framer-motion";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  };

  // Animate hiih
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const highlightVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1.02,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 1] },
    },
  };

  return (
    <motion.div
      className="space-y-4 font-futura text-neutral-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Title Category*/}
      <motion.div className="space-y-2" variants={itemVariants}>
        <motion.h1
          className="text-3xl font-medium uppercase tracking-[0.1em] leading-tight text-neutral-950"
          variants={highlightVariants}
        >
          {data.name}
        </motion.h1>
        <div className="flex items-center justify-between">
          <p className="text-sm font-normal uppercase tracking-[0.15em] text-neutral-600">
            Category: {data.category.name}
          </p>
          <Currency
            value={data.price}
            className="text-lg font-medium uppercase tracking-[0.06em]"
          />
        </div>
      </motion.div>

      <motion.hr
        className="border-t border-neutral-200/50"
        variants={itemVariants}
        style={{
          background: "linear-gradient(to right, transparent, #e2e1df, transparent)",
        }}
      />

      <motion.div className="space-y-3 text-sm uppercase tracking-[0.15em]" variants={itemVariants}>
        <div className="flex items-center gap-x-6">
          <span className="font-normal text-neutral-700">Size</span>
          <motion.span
            className="font-medium text-neutral-600"
            whileHover={{ color: "#a8a29e", scale: 1.05, transition: { duration: 0.3 } }}
          >
            {data.size.name}
          </motion.span>
        </div>
        <div className="flex items-center gap-x-6">
          <span className="font-normal text-neutral-700">Color</span>
          <motion.div
            className="h-5 w-5 rounded-full border border-neutral-300/30 shadow-sm"
            style={{ backgroundColor: data.color.value }}
            whileHover={{
              scale: 1.2,
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
              rotate: 10,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
          />
        </div>
      </motion.div>

      {/* Quality heseg */}
      {data.quality !== undefined && (
        <motion.div className="space-y-3" variants={itemVariants}>
          <div className="flex items-center justify-between">
            <span className="text-sm uppercase tracking-[0.15em] text-neutral-700 font-normal">
              Cashmere Percentage
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-amber-700">
                {data.quality}/100
              </span>
              <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2 py-1 rounded-full">
                {data.quality >= 90 ? 'Premium Grade' : 
                 data.quality >= 75 ? 'Luxury Grade' : 'Select Grade'}
              </span>
            </div>
          </div>
          
          <div className="relative">
            {/* Luxury progress bar */}
            <div className="relative h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
              {/* Gold gradient for premium feel */}
              <div 
                className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
                style={{ width: `${data.quality}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"></div>
              </div>
            </div>
            
            {/* Quality markers */}
            <div className="flex justify-between mt-2">
              {[0, 25, 50, 75, 100].map((mark) => (
                <div key={mark} className="relative">
                  <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 
                    w-0.5 h-2 ${data.quality >= mark ? 'bg-amber-600' : 'bg-neutral-300'}`}></div>
                  <span className={`text-[10px] ${data.quality >= mark ? 'text-amber-700 font-medium' : 'text-neutral-400'}`}>
                    {mark}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <p className="text-xs text-neutral-500 italic mt-1 tracking-normal">
            {data.quality >= 90 ? 'Exceptional fiber length and softness' :
             data.quality >= 75 ? 'Premium hand-feel with excellent durability' :
             'Quality selection with good characteristics'}
          </p>
        </motion.div>
      )}

      <motion.hr
        className="border-t border-neutral-200/50"
        variants={itemVariants}
        style={{
          background: "linear-gradient(to right, transparent, #e2e1df, transparent)",
        }}
      />

      {/* Add to Cart Button */}
      <motion.div className="pt-2" variants={itemVariants}>
        <Button
          className="group relative flex items-center gap-x-4 bg-neutral-950 text-white px-10 py-4 text-sm font-medium uppercase tracking-[0.18em] rounded-2 border border-neutral-950/80 overflow-hidden"
          onClick={onAddToCart}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent opacity-0 group-hover:opacity-100"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          />
          <motion.span
            className="relative z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <ShoppingCart size={16} className="inline-block mr-2" />
            Add To Cart
          </motion.span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Info;