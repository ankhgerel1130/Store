"use client";

import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Color, Size } from "@/types";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterProps {
    data: (Size | Color)[];
    name: string;
    valueKey: string;
}

const Filter: React.FC<FilterProps> = ({
    data,
    name,
    valueKey
}) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedValue = searchParams.get(valueKey);

    const onClick = (id: string) => {
        const current = qs.parse(searchParams.toString());
        
        const query = {
            ...current,
            [valueKey]: id 
        };
        if (current[valueKey] === id){
            query[valueKey] = null;
        }
        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, {skipNull: true});
        router.push(url);
    };

    return (
        <div className="mb-8">
            <h3 className="text-lg font-semibold">
                {name}
            </h3>
            <hr className="my-4" />
            <div className="flex flex-wrap gap-2">
                {data.map((filter) => (
                    <div key={filter.id} className="flex items-center">
                        <Button
                            className={cn(
                                "rounded-md text-sm p-2 border border-gray-300 cursor-pointer flex items-center gap-2",
                                "transition-all duration-300 ease-in-out",
                                "hover:scale-105 hover:shadow-md hover:border-black",
                                "active:scale-95",
                                // Default style for all filters (black text on white background)
                                "bg-white text-black",
                                // Selected style for all filters (white text on black background)
                                selectedValue === filter.id && "bg-black text-white border-black"
                            )}
                            onClick={() => onClick(filter.id)}
                        >
                            {valueKey === "colorId" && (
                                <span 
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{ backgroundColor: (filter as Color).value }}
                                />
                            )}
                            {filter.name}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Filter;