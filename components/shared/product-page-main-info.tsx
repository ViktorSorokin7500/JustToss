import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { EffectsList } from "./effects-list";

interface Props {
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    thcLevel: string;
    description: string;
    type: {
      id: number;
      name: string;
    };
    terpene: {
      id: number;
      name: string;
    } | null;
    effects: Array<{
      id: number;
      productId: number;
      effectId: number;
      value: number;
      effect: {
        id: number;
        name: string;
      };
    }>;
  };
}

export const ProductPageMainInfo: React.FC<Props> = ({ product }) => {
  return (
    <div className="flex items-center px-2 gap-20">
      <div className="space-y-4">
        <div className="flex justify-center p-6 bg-green-50 rounded-full size-[320px]">
          <img
            className="size-[270px] rounded-full"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/800px-No_image_available.svg.png"
            alt={product.name}
          />
        </div>
        <div className="grid">
          <Button>Buy</Button>
        </div>
      </div>
      <div className="flex-1 p-4 border border-primary max-h-fit space-y-2">
        <div className="flex flex-wrap gap-3 text-lg">
          <span>
            <b>THC level:</b> {product.thcLevel}%
          </span>
          <span className="flex gap-1">
            <b>Terpene:</b>
            <span className="first-letter:capitalize">
              {product.terpene?.name}
            </span>
          </span>
          <span>
            <b>Type:</b> {product.type.name}
          </span>
          <span>
            <b>Price:</b> ${product.price}
          </span>
        </div>
        <div className="text-gray-700">{product.description}</div>
        <EffectsList effects={product.effects} />
      </div>
    </div>
  );
};
