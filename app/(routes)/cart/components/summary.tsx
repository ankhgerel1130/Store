"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        productIds: items.map((item) => item.id),
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Failed to initiate checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-2xl font-light tracking-widest text-neutral-900 uppercase">
        Order Summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-light tracking-wide text-neutral-900">
            Order total
          </div>
          <Currency value={totalPrice} className="text-base font-light text-neutral-900" />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0 || isLoading}
        className={`
          w-full mt-6
          relative
          bg-gradient-to-r from-neutral-900 to-indigo-900
          text-white
          font-medium
          rounded-lg
          px-6
          py-3
          transition-all
          duration-300
          ease-in-out
          hover:from-neutral-800 hover:to-indigo-800
          hover:shadow-lg
          hover:-translate-y-0.5
          active:scale-95
          disabled:opacity-50
          disabled:cursor-not-allowed
          ${isLoading ? "cursor-wait" : ""}
        `}
        aria-disabled={items.length === 0 || isLoading}
        aria-label={isLoading ? "Processing checkout" : "Proceed to checkout"}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Processing...
          </span>
        ) : (
          "Checkout"
        )}
      </Button>
    </div>
  );
};

export default Summary;