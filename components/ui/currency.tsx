"use client";

import { useState, useEffect } from "react";

export const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "BRL",
});

interface CurrencyProps {
  value: string | number;
}

const Currency: React.FC<CurrencyProps> = ({ value }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="font-semibold">{priceFormatter.format(Number(value))}</div>
  );
};

export default Currency;
