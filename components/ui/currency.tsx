"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("mn-MN", {
    style: 'currency',
    currency: 'MNT',
});

interface CurrencyProps {
    value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({ value }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || value == null) {
        return null;
    }

    return (
        <span className="font-semibold">
            {formatter.format(Number(value))}
        </span>
    );
};

export default Currency;
