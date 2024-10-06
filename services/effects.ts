import { Effects } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export const getAll = async (): Promise<Effects[]> => {
  return (await axiosInstance.get<Effects[]>(ApiRoutes.EFFECTS)).data;
};
