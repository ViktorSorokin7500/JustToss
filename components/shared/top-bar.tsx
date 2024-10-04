import React from "react";
import { cn } from "@/lib/utils";
import { Categories, Container, SortPopup } from ".";

interface Props {
  className?: string;
}

export const TopBar: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        className,
        "sticky top-0 bg-white py-5 px-2 shadow-lg shadow-black/5 z-10"
      )}
    >
      <Container className="flex justify-between items-center">
        <Categories />
        <SortPopup />
      </Container>
    </div>
  );
};
