import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { Effect } from "@prisma/client";

export const getAll = async (): Promise<Effect[]> => {
  return (await axiosInstance.get<Effect[]>(ApiRoutes.EFFECTS)).data;
};
