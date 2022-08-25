import { Notifications } from "@/components/Notifications";
import PrivateLayout from "@/components/PrivateLayout";
import { useAddRecipe } from "@/domain/recipes/api";
import { RecipeForCreationDto } from "@/domain/recipes/types";
import { DevTool } from "@hookform/devtools";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function NewRecipe() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    setFocus,
    formState: { errors },
  } = useForm<RecipeForCreationDto>({
    defaultValues: {
      visibility: "public",
    },
  });
  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  const createRecipeApi = useAddRecipe();
  const onSubmit: SubmitHandler<RecipeForCreationDto> = (data) =>
    createRecipe(data);
  function createRecipe(data: RecipeForCreationDto) {
    createRecipeApi
      .mutateAsync(data)
      .then(() => {
        Notifications.success("Recipe created successfully");
      })
      .then(() => {
        reset();
      })
      .catch((e) => {
        Notifications.error("There was an error creating the recipe");
        console.error(e);
      });
  }

  return (
    <PrivateLayout>
      <div className="space-y-6">
        <button
          className="px-3 py-2 border rounded-md border-slate-700 dark:border-white"
          onClick={() => router.back()}
        >
          Back
        </button>
        <div className="">
          <h1 className="max-w-4xl text-2xl font-medium tracking-tight font-display text-slate-900 dark:text-gray-50 sm:text-4xl">
            Add a Recipe
          </h1>
          <form className="py-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("title")}
              className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Title..."
            />
            <input
              {...register("visibility")}
              className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Visible..."
            />
            <input
              {...register("directions")}
              className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Directions..."
            />
            <input
              {...register("rating")}
              className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Rating..."
            />

            <div className="">
              <input
                type="submit"
                className="px-3 py-2 text-white border rounded-md shadow cursor-pointer border-slate-violet-800 bg-violet-500 dark:border-violet-500 dark:bg-transparent dark:shadow-violet-500"
                value="Submit"
              />
            </div>
          </form>
          <DevTool control={control} placement={"bottom-right"} />
        </div>
      </div>
    </PrivateLayout>
  );
}
