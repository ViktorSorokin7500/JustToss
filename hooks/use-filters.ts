import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "qs";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  sortBy?: string;
  types: string[];
  terpenes: string[];
  effects: string[];
}

export const useFilters = () => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;
  const router = useRouter();

  const [sortBy, setSortBy] = useState<string | undefined>(
    searchParams.get("sortBy") ?? undefined
  );
  const [selectedFilters, setSelectedFilters] = useState({
    types: searchParams.get("types")?.split(",") ?? ([] as string[]),
    terpenes: searchParams.get("terpenes")?.split(",") ?? ([] as string[]),
    effects: searchParams.get("effects")?.split(",") ?? ([] as string[]),
  });
  const [prices, setPrices] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  useEffect(() => {
    const filters = {
      ...prices,
      sortBy,
      ...selectedFilters,
    };

    const query = qs.stringify(filters, { arrayFormat: "comma" });
    router.push(`?${query}`, { scroll: false });
  }, [prices, selectedFilters, sortBy, router]);

  const updateSelectedFilters = (
    filterName: keyof typeof selectedFilters,
    selectedValues: string[]
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: selectedValues,
    }));
  };

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

  return {
    sortBy,
    setSortBy,
    selectedFilters,
    updateSelectedFilters,
    prices,
    updatePrice,
  };
};
