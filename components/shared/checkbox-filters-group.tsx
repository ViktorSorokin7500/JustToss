// checkbox-filters-group.tsx
import React from "react";
import { cn } from "@/lib/utils";
import { FilterChecboxProps, FilterCheckbox } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  loading: boolean;
  onChange: (values: string[]) => void;
  defaultValue?: string[];
  className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 4,
  searchInputPlaceholder = "Search...",
  loading,
  onChange,
  defaultValue,
  className,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const [checkedValues, setCheckedValues] = React.useState<string[]>(
    defaultValue || []
  );

  console.log("checkedValues =>", defaultValue);

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : defaultItems.slice(0, limit);

  const toggleCheckbox = (value: string) => {
    const newCheckedValues = checkedValues.includes(value)
      ? checkedValues.filter((v) => v !== value)
      : [...checkedValues, value];

    setCheckedValues(newCheckedValues);
    onChange(newCheckedValues);
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div>
        <p className="font-bold mb-3">{title}</p>

        {...Array(3)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />
          ))}
      </div>
    );
  }

  return (
    <div className={cn(className)}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            checked={checkedValues.includes(item.value)}
            onCheckedChange={() => toggleCheckbox(item.value)}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            className="text-primary mt-3"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        </div>
      )}
    </div>
  );
};
