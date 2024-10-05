import React from "react";
import { cn } from "@/lib/utils";
import { RangeSlider, RenderFilterGroup, SortPopup, Title } from ".";
import { Input } from "../ui";
import { effectTypes, terpene, types } from "@/lib/data_details";
import { useFilterItems } from "@/hooks";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const effectItems = useFilterItems(effectTypes);
  const terpeneItems = useFilterItems(terpene);
  const typeItems = useFilterItems(types);

  return (
    <div className={cn(className)}>
      <Title text="Fliters" size="md" className="font-bold" />
      <div className="space-y-3">
        <SortPopup className="w-full" />
        <div>
          <p className="font-bold mb-3">Price:</p>
          <div className="flex gap-3 mb-5">
            <Input type="number" placeholder="0" min={0} max={10} />
            <Input type="number" placeholder="10" min={1} max={10} />
          </div>

          <RangeSlider
            min={0}
            max={10}
            step={0.5}
            value={[0, 10]}
            className="pb-2"
          />
        </div>

        <RenderFilterGroup title="Type" items={typeItems} />
        <RenderFilterGroup title="Terpene" items={terpeneItems} />
        <RenderFilterGroup title="Effects" items={effectItems} />
      </div>
    </div>
  );
};
