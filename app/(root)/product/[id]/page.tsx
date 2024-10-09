import { Container, EffectsList, Title } from "@/components/shared";
import { ProductPageMainInfo } from "@/components/shared/product-page-main-info";
import { Button } from "@/components/ui";
import { prisma } from "@/prisma/prisma-client";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      type: true,
      terpene: true,
      effects: {
        include: {
          effect: true,
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  console.log(product);

  return (
    <Container className="flex flex-col my-10">
      <Title
        size="xl"
        text={product.name}
        className="font-extrabold text-center"
      />
      {/* <div className="flex items-center px-2 gap-20">
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
      </div> */}
      <ProductPageMainInfo product={product} />
    </Container>
  );
}
