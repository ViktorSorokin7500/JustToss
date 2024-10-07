"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { RangeSlider, RenderFilterGroup, SortPopup, Title } from ".";
import { Input } from "../ui";
import { useFilterData } from "@/hooks/use-filter-data";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { effects, terpenes, types, loading } = useFilterData();

  const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
  const [selectedTerpenes, setSelectedTerpenes] = React.useState<string[]>([]);
  const [selectedEffects, setSelectedEffects] = React.useState<string[]>([]);

  console.log("effects =>", selectedEffects);
  console.log("terpenes =>", selectedTerpenes);
  console.log("types =>", selectedTypes);

  const effectItems = effects.map((effect) => ({
    value: String(effect.id),
    text: effect.name.replace(/_/g, " "),
  }));

  const typeItems = types.map((type) => ({
    value: String(type.id),
    text: type.name,
  }));

  const terpeneItems = terpenes.map((terpene) => ({
    value: String(terpene.id),
    text: terpene.name,
  }));

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

        <RenderFilterGroup
          title="Type"
          items={typeItems}
          loading={loading.types}
          onChange={(values) => {
            setSelectedTypes(values);
          }}
        />

        <RenderFilterGroup
          title="Terpene"
          items={terpeneItems}
          loading={loading.terpenes}
          onChange={(values) => {
            setSelectedTerpenes(values);
          }}
        />

        <RenderFilterGroup
          title="Effects"
          items={effectItems}
          loading={loading.effects}
          onChange={(values) => {
            setSelectedEffects(values);
          }}
        />
      </div>
    </div>
  );
};
