"use client";

import React from "react";
import data from "@/lib/leafly_strain_data.json";
import { ProductCard } from "./product-card";

export const ProductList = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <>
      <div className="grid grid-cols-3 gap-12">
        {currentItems.map((product, i) => (
          <ProductCard
            key={i}
            id={product.id}
            name={product.name}
            price={product.price.toFixed(2)}
            imageUrl={product.img_url}
            type={product.type}
            thc={product.thc_level}
            terpene={product.most_common_terpene}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-green-500 text-white"
                : "bg-green-100 "
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};
