import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { Terpene } from "@prisma/client";

export const getAll = async (): Promise<Terpene[]> => {
  return (await axiosInstance.get<Terpene[]>(ApiRoutes.TERPENES)).data;
};
