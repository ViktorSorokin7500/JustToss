import { prisma } from "./prisma-client";
import buds from "../lib/leafly_strain_data.json";
import { hashSync } from "bcrypt";
import { types, terpenes } from "../lib/data_details";

async function up() {
  const typeMap: { [key: string]: number } = {};
  for (const type of types) {
    const createdType = await prisma.type.create({
      data: { name: type },
    });
    typeMap[type] = createdType.id;
  }

  const terpeneMap: { [key: string]: number } = {};
  for (const terpene of terpenes) {
    const createdTerpene = await prisma.terpene.create({
      data: { name: terpene },
    });
    terpeneMap[terpene] = createdTerpene.id;
  }

  await prisma.user.createMany({
    data: [
      {
        fullName: "User Test",
        email: "user@test.com",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Admin",
        email: "admin@test.com",
        password: hashSync("111111", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  const productsData = buds;

  for (const product of productsData) {
    await prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.img_url,
        typeId: typeMap[product.type],
        thcLevel: product.thc_level,
        description: product.description,
        terpeneId: terpeneMap[product.most_common_terpene.toLowerCase()],
        effects: product.effects,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  for (const type of types) {
    await prisma.type.create({
      data: {
        name: type,
      },
    });
  }

  for (const terpene of terpenes) {
    await prisma.terpene.create({
      data: {
        name: terpene,
      },
    });
  }

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "11111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "222222",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productId: 1,
      cartId: 1,
      quantity: 2,
    },
  });

  console.log("Seed data created successfully");
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
