import React from "react";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";

interface Props {
  title: string;
  items: { text: string; value: string }[];
  loading: boolean;
  onChange: (selectedValues: string[]) => void;
}

export const RenderFilterGroup: React.FC<Props> = ({
  title,
  items,
  loading,
  onChange,
}) => {
  const defaultItems = items.slice(0, 6);
  return (
    <>
      <div className="w-full h-[1px] bg-gray-200" />
      <CheckboxFiltersGroup
        title={title}
        limit={6}
        items={items}
        defaultItems={defaultItems}
        loading={loading}
        onChange={onChange}
      />
    </>
  );
};
