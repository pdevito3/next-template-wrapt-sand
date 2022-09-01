import { clients } from "@/lib/axios";
import { AxiosError } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";
import { RecipeForUpdateDto } from "../types";
import { RecipeKeys } from "./recipe.keys";

export const updateRecipe = async (id: string, data: RecipeForUpdateDto) => {
  const axios = await clients.recipeManagement();
  return axios.put(`/recipes/${id}`, data).then((response) => response.data);
};

export interface UpdateProps {
  id: string;
  data: RecipeForUpdateDto;
}

export function useUpdateRecipe(
  options?: UseMutationOptions<void, AxiosError, UpdateProps>
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data: updatedRecipe }: UpdateProps) =>
      updateRecipe(id, updatedRecipe),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(RecipeKeys.lists());
        queryClient.invalidateQueries(RecipeKeys.details());
      },
      ...options,
    }
  );
}
