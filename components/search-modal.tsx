
"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Search } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import getProducts from "@/actions/get-products";
import { Product } from "@/types";
import ProductCard from "./ui/product-card";
import { useRouter } from "next/navigation";

const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        setIsLoading(true);
        getProducts({ name: searchTerm })
          .then((data) => {
            setResults(data);
            setIsLoading(false);
          })
          .catch(() => setIsLoading(false));
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const closeModal = () => {
    setIsOpen(false);
    setSearchTerm("");
    setResults([]);
  };

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
    closeModal();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-white hover:text-gray-300 transition-colors"
        aria-label="Search products"
      >
        <Search className="h-5 w-5" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search products..."
                      className="w-full p-4 pl-12 text-gray-900 focus:outline-none"
                      autoFocus
                    />
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto">
                    {isLoading ? (
                      <div className="p-8 text-center text-gray-500">
                        Searching...
                      </div>
                    ) : results.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                        {results.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => handleProductClick(product.id)}
                            className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                          >
                            <ProductCard data={product} />
                          </div>
                        ))}
                      </div>
                    ) : searchTerm ? (
                      <div className="p-8 text-center text-gray-500">
                        No products found
                      </div>
                    ) : null}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SearchModal;