import { Container, Title } from "@/components/shared";
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
  return <Container className="flex flex-col my-10"></Container>;
}
