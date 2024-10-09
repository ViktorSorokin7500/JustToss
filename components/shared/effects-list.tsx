import React from "react";
import { cn } from "@/lib/utils";
import { effectCriteria } from "@/lib/data_details";

interface Effect {
  effect: { name: string; id: number };
  value: number;
}

interface Props {
  className?: string;
  effects: Effect[];
}

export const EffectsList: React.FC<Props> = ({ className, effects }) => {
  return (
    <div className={cn(className, "mx-auto flex flex-wrap gap-1")}>
      {effects
        .sort((a, b) => b.value - a.value)
        .map((effect, i) => {
          const effectName = effect.effect.name.replace(/_/g, " ");

          let bgColorClass = "";

          if (effectCriteria.good.includes(effect.effect.name)) {
            bgColorClass = "bg-green-600";
          } else if (effectCriteria.neutral.includes(effect.effect.name)) {
            bgColorClass = "bg-gray-600";
          } else if (effectCriteria.bad.includes(effect.effect.name)) {
            bgColorClass = "bg-red-600";
          }

          if (effect.value < 20) {
            bgColorClass += " opacity-70";
          } else if (effect.value > 20 && effect.value <= 40) {
            bgColorClass += " opacity-80";
          } else if (effect.value > 40 && effect.value <= 75) {
            bgColorClass += " opacity-90";
          } else if (effect.value > 75) {
            bgColorClass += " opacity-100";
          }

          return (
            <span
              key={i}
              className={`${bgColorClass} text-white text-sm w-fit py-1 px-2 rounded-lg cursor-default shadow hover:shadow-none`}
            >
              {effectName} {effect.value}%
            </span>
          );
        })}
    </div>
  );
};
