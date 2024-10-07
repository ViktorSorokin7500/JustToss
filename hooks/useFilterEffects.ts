"use client";
import { Api } from "@/services/api-client";
import { Effect } from "@prisma/client";
import React from "react";

interface ReturnProps {
  itemEffects: Effect[];
}

export const useFilterEffects = (): ReturnProps => {
  const [itemEffects, setItemsEffects] = React.useState<Effect[]>([]);
  React.useEffect(() => {
    async function fetchtEffects() {
      try {
        const effects = await Api.effects.getAll();
        setItemsEffects(effects);
      } catch (error) {}
    }

    fetchtEffects();
  }, []);

  return { itemEffects };
};
