import React from "react";
import { cn } from "@/lib/utils";
import { CheckboxFiltersGroup, FilterCheckbox, RangeSlider, Title } from ".";
import { Input } from "../ui";
import data from "@/lib/leafly_strain_data.json";

import { effectTypes } from "@/lib/effects";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const items = effectTypes.map((effect, i) => ({
    text: effect,
    value: (i + 1).toString(),
  }));

  return (
    <div className={cn(className)}>
      <Title text="Fliters" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="New" value="1" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price:</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={10} />
          <Input type="number" placeholder="10" min={1} max={10} />
        </div>

        <RangeSlider min={0} max={10} step={0.5} value={[0, 10]} />
      </div>

      <CheckboxFiltersGroup
        title="Effects"
        className="mt-5"
        limit={6}
        items={items}
        defaultItems={items.slice(0, 6)}
      />
    </div>
  );
  <div></div>;
};
