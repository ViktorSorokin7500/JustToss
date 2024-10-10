"use client";
import React from "react";
import { Title } from "./title";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Button } from "../ui";
import Link from "next/link";

import { Autoplay } from "swiper/modules";

interface Props {
  recommendedProducts: Array<{
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
  }>;
}

export const RecommendProduct: React.FC<Props> = ({ recommendedProducts }) => {
  return (
    <div className="flex flex-col gap-3">
      <Title
        text="Recommend products"
        size="lg"
        className="w-full text-center"
      />
      <div className="h-[350px] flex flex-row gap-3 px-4">
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          spaceBetween={30}
          className="mySwiper"
        >
          {recommendedProducts.map((product) => (
            <SwiperSlide
              key={product.id}
              className="border rounded-lg shadow-lg"
            >
              <div className="py-4 bg-green-50">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/800px-No_image_available.svg.png"
                  alt={product.name}
                  className="h-48 mx-auto rounded-full shadow-lg"
                />
              </div>
              <div className="py-2">
                <span className="text-lg font-semibold flex justify-center">
                  {product.name}
                </span>
                <div className="px-4 grid grid-cols-2 text-sm">
                  <span>THC: {product.thcLevel}%</span>
                  <span>Terpene: {product.terpene?.name}</span>
                  <span>Type: {product.type.name}</span>
                  <span>Price: ${product.price.toFixed(2)}</span>
                </div>
              </div>
              <div className="grid">
                <Button asChild>
                  <Link href={`/product/${product.id}`}>Go to product</Link>
                </Button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
