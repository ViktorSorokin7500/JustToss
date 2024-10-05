import React from "react";
export const useFilterItems = (items: string[]) => {
  return React.useMemo(() => {
    return items.map((item, i) => ({
      text: item,
      value: (i + 1).toString(),
    }));
  }, [items]);
};
