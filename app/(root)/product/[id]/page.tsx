import { Container, RecommendProduct, Title } from "@/components/shared";
import { ProductPageMainInfo } from "@/components/shared/product-page-main-info";
import { prisma } from "@/prisma/prisma-client";
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

  const recommendedProducts = await prisma.product.findMany({
    where: {
      typeId: product.typeId,
      id: {
        not: product.id,
      },
      terpeneId: {
        not: 1,
      },
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
    take: 4,
  });

  return (
    <Container className="flex flex-col my-10 space-y-4">
      <Title
        size="xl"
        text={product.name}
        className="font-extrabold text-center"
      />
      <ProductPageMainInfo product={product} />
      <RecommendProduct recommendedProducts={recommendedProducts} />
    </Container>
  );
}
