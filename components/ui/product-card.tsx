"use client";

import Currency from "@/components/ui/currency";
import Image from "next/image";
import { Product } from "@/types";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";

interface ProductCardProps {
    data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const cart = useCart();
    const router = useRouter();
    const previewModal = usePreviewModal();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleClick = () => {
        router.push(`/product/${data?.id}`);
    };

    const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        previewModal.onOpen(data);
    };

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(data);
    };

    return (
        <div
            onClick={handleClick}
            className="group cursor-pointer border border-neutral-100 p-0 overflow-hidden relative transition-all hover:border-neutral-300 mb-12 w-full max-w-[340px] bg-white shadow-md hover:shadow-lg"
        >
            {/* Image Section */}
            <div
                className="aspect-[3/4] bg-white relative overflow-hidden"
                onMouseEnter={() => data.images?.length > 1 && setCurrentImageIndex(1)}
                onMouseLeave={() => setCurrentImageIndex(0)}
            >
                {data.images?.[0]?.url && (
                    <Image
                        src={data.images[0].url}
                        fill
                        alt={data.name}
                        className={`object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-95 ${
                            currentImageIndex === 0 ? "opacity-100" : "opacity-0"
                        }`}
                        priority
                    />
                )}
                {data.images?.[1]?.url && (
                    <Image
                        src={data.images[1].url}
                        fill
                        alt={data.name}
                        className={`object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-95 ${
                            currentImageIndex === 1 ? "opacity-100" : "opacity-0"
                        }`}
                    />
                )}

                {/* Indicator Dots */}
                {data.images?.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                        {data.images.map((_, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setCurrentImageIndex(index);
                                }}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                    currentImageIndex === index
                                        ? "bg-white w-4 h-1.5"
                                        : "bg-white"
                                }`}
                            />
                        ))}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute inset-0 flex items-end justify-end p-4 gap-2 z-10">
                    <IconButton
                        onClick={onPreview}
                        icon={<Expand size={18} className="text-white" />}
                        className="bg-neutral-800 border border-neutral-800 p-2 hover:bg-neutral-900 hover:border-neutral-900 transition-all duration-300"
                    />
                    <IconButton
                        onClick={onAddToCart}
                        icon={<ShoppingCart size={18} className="text-white" />}
                        className="bg-neutral-800 border border-neutral-800 p-2 hover:bg-neutral-900 hover:border-neutral-900 transition-all duration-300"
                    />
                </div>
            </div>

            {/* Info Section */}
            <div className="p-4 space-y-2 font-inter">
                <h3 className="font-normal text-neutral-900 uppercase tracking-[0.1em] text-base leading-tight break-words">
                    {data.name}
                </h3>
                <p className="font-normal text-neutral-600 uppercase tracking-[0.1em] text-sm">
                   {data.category?.name}
                </p>
                <p className="font-normal text-neutral-600 uppercase tracking-[0.1em] text-sm">
                    Size: {data.size?.name} ({data.size?.value})
                </p>
                <div className="flex items-center justify-between pt-2">
                    <Currency
                        value={data?.price}
                        className="font-normal text-base uppercase tracking-[0.1em] text-neutral-900"
                    />
                </div>
            </div>

            {/* Badges */}
            {data.category?.name === "PREMIUM" && (
                <div className="absolute top-3 left-3 bg-white px-2 py-0.5 text-[10px] font-inter font-normal tracking-[0.2em] uppercase text-neutral-900 border border-neutral-200 z-10">
                    PREMIUM
                </div>
            )}
            {data.category?.name === "New" && (
                <div className="absolute top-3 left-3 bg-white px-2 py-0.5 text-[10px] font-inter font-normal tracking-[0.2em] uppercase text-neutral-900 border border-neutral-200 z-10">
                    New SEASON
                </div>
            )}
               {data.category?.name === "HIGHLIGHTS" && (
               <div className="absolute top-3 left-3 bg-white px-2 py-0.5 text-[10px] font-inter font-normal tracking-[0.2em]  text-neutral-900 uppercase  border border-yellow-400 z-10">
               Highlight
             </div>
             
            )}
        </div>
    );
};

export default ProductCard;