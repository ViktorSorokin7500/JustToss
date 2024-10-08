"use client";
import React from "react";
import { RangeSlider, RenderFilterGroup, SortPopup, Title } from ".";
import { Input } from "../ui";
import { useFilterData } from "@/hooks/use-filter-data";
import { cn, mapItems } from "@/lib";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  sortBy?: string;
  types: string;
  terpenes: string;
  effects: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;
  const router = useRouter();
  const { effects, terpenes, types, loading } = useFilterData();

  const [sortBy, setSortBy] = React.useState<string | undefined>(
    searchParams.get("sortBy") ?? undefined
  );

  const [selectedFilters, setSelectedFilters] = React.useState({
    types: searchParams.get("types")?.split(",") ?? ([] as string[]),
    terpenes: searchParams.get("terpenes")?.split(",") ?? ([] as string[]),
    effects: searchParams.get("effects")?.split(",") ?? ([] as string[]),
  });

  const [prices, setPrice] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updateSelectedFilters = (
    filterName: keyof typeof selectedFilters,
    selectedValues: string[]
  ) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterName]: selectedValues,
    }));
  };

  const effectItems = mapItems(effects);
  const typeItems = mapItems(types);
  const terpeneItems = mapItems(terpenes);

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice({ ...prices, [name]: value });
  };

  React.useEffect(() => {
    const filters = {
      ...prices,
      sortBy,
      types: selectedFilters.types,
      terpenes: selectedFilters.terpenes,
      effects: selectedFilters.effects,
    };

    const query = qs.stringify(filters, { arrayFormat: "comma" });

    router.push(`?${query}`, { scroll: false });
  }, [prices, selectedFilters, sortBy, router]);

  return (
    <div className={cn(className)}>
      <Title text="Fliters" size="md" className="font-bold" />
      <div className="space-y-3">
        <SortPopup className="w-full" sortBy={sortBy} setSortBy={setSortBy} />
        <div>
          <p className="font-bold mb-3">Price:</p>
          <div className="flex gap-3 mb-5">
            <Input
              type="number"
              placeholder="0"
              min={0}
              max={10}
              value={String(prices.priceFrom)}
              onChange={(e) => updatePrice("priceFrom", Number(e.target.value))}
            />
            <Input
              type="number"
              min={1}
              max={10}
              placeholder="1000"
              value={String(prices.priceTo)}
              onChange={(e) => updatePrice("priceTo", Number(e.target.value))}
            />
          </div>

          <RangeSlider
            min={0}
            max={10}
            step={0.1}
            value={[prices.priceFrom || 0, prices.priceTo || 10]}
            onValueChange={([priceFrom, priceTo]) =>
              setPrice({ priceFrom, priceTo })
            }
            className="pb-2"
          />
        </div>

        <RenderFilterGroup
          title="Type"
          items={typeItems}
          loading={loading.types}
          defaultValue={selectedFilters.types}
          onChange={(selectedValues) =>
            updateSelectedFilters("types", selectedValues)
          }
        />

        <RenderFilterGroup
          title="Terpene"
          items={terpeneItems}
          loading={loading.terpenes}
          defaultValue={selectedFilters.terpenes}
          onChange={(selectedValues) =>
            updateSelectedFilters("terpenes", selectedValues)
          }
        />

        <RenderFilterGroup
          title="Effects"
          items={effectItems}
          loading={loading.effects}
          defaultValue={selectedFilters.effects}
          onChange={(selectedValues) =>
            updateSelectedFilters("effects", selectedValues)
          }
        />
      </div>
    </div>
  );
};
