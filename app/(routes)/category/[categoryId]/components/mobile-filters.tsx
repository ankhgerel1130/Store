"use client";

import { useState } from "react";
import { Color, Size } from "@/types";
import Button from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import IconButton from "@/components/ui/icon-button";
import Filter from "./filter";

interface MobileFiltersProps {
    sizes: Size[];
    colors: Color[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
    sizes,
    colors
}) => {
    const [open, setOpen] = useState(false);

    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    return (
        <>
            <Button 
                onClick={onOpen} 
                className="flex items-center gap-x-2 lg:hidden cursor-pointer"
                variant="outline"
            >
                <span className="text-sm font-medium">Filters</span>
                <Plus size={18} className="text-gray-600" />
            </Button>

            <Transition show={open}>
                <Dialog 
                    as="div" 
                    className="relative z-50 lg:hidden" 
                    onClose={onClose}
                >
                    {/* Background overlay */}
                    <Transition.Child
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-opacity-10" />
                    </Transition.Child>

                    {/* Slide-in panel */}
                    <Transition.Child
                        enter="transform transition ease-in-out duration-300"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-200"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <div className="fixed inset-0 z-40 flex">
                            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white shadow-xl">
                                {/* Header */}
                                <div className="flex items-center justify-between p-4">
                                    <Dialog.Title className="text-lg font-medium">
                                        Filters
                                    </Dialog.Title>
                                    <button 
                                        onClick={onClose}
                                        className="p-2 text-gray-500 hover:text-black transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                
                                {/* Filters content */}
                                <div className="space-y-6 p-4">
                                    <Filter
                                        valueKey="sizeId"
                                        name="Sizes"
                                        data={sizes}
                                    />
                                    <Filter
                                        valueKey="colorId"
                                        name="Colors"
                                        data={colors}
                                    />
                                </div>
                            </Dialog.Panel>
                        </div>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </>
    );
};

export default MobileFilters;