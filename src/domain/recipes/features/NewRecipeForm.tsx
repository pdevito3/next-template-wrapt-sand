import TextInput from "@/components/Forms/TextInput";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddRecipe } from "../api";
import { RecipeForCreationDto } from "../types/index";

function NewRecipeForm() {
  const { register, handleSubmit, reset, control, setFocus } =
    useForm<RecipeForCreationDto>({
      defaultValues: {
        visibility: "public",
      },
    });
  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  const createRecipeApi = useAddRecipe();
  const onSubmit: SubmitHandler<RecipeForCreationDto> = (data) => {
    createRecipe(data);
    setFocus("title");
  };

  function createRecipe(data: RecipeForCreationDto) {
    createRecipeApi
      .mutateAsync(data)
      .then(() => {
        // Notifications.success("Recipe created successfully");
        toast.success("Recipe created successfully");
      })
      .then(() => {
        reset();
      })
      .catch((e) => {
        toast.error("There was an error creating the recipe");
        console.error(e);
      });
  }

  function makeToast() {
    toast.custom(
      (t) => (
        // TODO framer motion
        <div className={`bg-white px-6 py-4 shadow-md rounded-full `}>
          Hello TailwindCSS! 👋
        </div>
      ),
      {
        duration: 1500,
      }
    );
  }

  return (
    <>
      <div className="py-5">
        <button onClick={() => makeToast()}>toast 🥂</button>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-80">
          <TextInput
            label={"Title"}
            control={control}
            name="title"
            rules={{ required: "Title is required." }}
            placeholder={"Title..."}
          />
        </div>

        <input
          {...register("visibility")}
          className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"
          placeholder="Visibility..."
        />
        <input
          {...register("directions")}
          className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"
          placeholder="Directions..."
        />
        <input
          {...register("rating")}
          className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"
          placeholder="Rating..."
        />
        {/* <NumberField
          register={register}
          label={"Rating"}
          fieldName={"rating"}
          placeholder={"Rating..."}
          minValue={0}
          maxValue={5}
        /> */}

        <div className="">
          <input
            type="submit"
            className="px-3 py-2 text-white border rounded-md shadow cursor-pointer border-violet-800 bg-violet-500 dark:border-violet-500 dark:bg-transparent dark:shadow-violet-500"
            value="Submit"
          />
        </div>
      </form>
      <DevTool control={control} placement={"bottom-right"} />
    </>
  );
}

export { NewRecipeForm };
