import { clients } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { RecipeDto } from "../types";
import { RecipeKeys } from "./recipe.keys";

export const getRecipe = async (id: string) => {
  const axios = await clients.recipeManagement();

  return axios
    .get(`/recipes/${id}`)
    .then((response: AxiosResponse<RecipeDto>) => response.data);
};

export const useGetRecipe = (id: string | null | undefined) => {
  return useQuery(RecipeKeys.detail(id!), () => getRecipe(id!), {
    enabled: id !== null && id !== undefined,
  });
};
