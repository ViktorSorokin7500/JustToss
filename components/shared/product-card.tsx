import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Title } from "./title";
import { Button } from "../ui";

interface Props {
  id: number;
  name: string;
  price: number | string;
  imageUrl: string | undefined;
  type: string;
  thc: string;
  terpene: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  type,
  terpene,
  thc,
  className,
}) => {
  return (
    <div className={cn(className)}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-green-50 rounded-lg h-[260px]">
          <img
            className="size-[215px] rounded-full"
            src={imageUrl}
            alt={name}
          />
        </div>

        <Title
          text={name}
          size="sm"
          className="mb-1 mt-3 font-bold text-center"
        />

        <div className="flex justify-between">
          <p>
            <b>Type:</b> {type}
          </p>
          <p>
            <b>THC:</b> {thc}%
          </p>
        </div>
        <p className="text-center">
          <b>Terpene:</b> {terpene}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            from <b>${price}</b>
          </span>

          <Button variant="secondary" className="text-base font-bold">
            More
          </Button>
        </div>
      </Link>
    </div>
  );
};
