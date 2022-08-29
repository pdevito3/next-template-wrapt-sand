import ComboBox from "@/components/Forms/Combobox";
import NumberInput from "@/components/Forms/NumberInput";
import TextInput from "@/components/Forms/TextInput";
import { DevTool } from "@hookform/devtools";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
  // useEffect(() => {
  //   setFocus("title");
  // }, [setFocus]);

  const createRecipeApi = useAddRecipe();
  const onSubmit: SubmitHandler<RecipeForCreationDto> = (data) => {
    createRecipe(data);
    // setFocus("title");
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
      {/* Need `noValidate` to allow RHF validation to trump browser validation when field is required */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="w-80">
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field, fieldState }) => (
              <TextInput
                label={"Title"}
                placeholder="Title..."
                required
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="w-80">
          <Controller
            name="visibility"
            control={control}
            rules={{ required: "Visibility is required" }}
            render={({ field, fieldState }) => (
              <ComboBox
                label={"Visibility"}
                placeholder="Visibility..."
                data={["public", "private"]}
                clearable
                required
                searchable
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>

        <input
          {...register("directions")}
          className="block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"
          placeholder="Directions..."
        />

        <div className="w-80">
          <Controller
            name="rating"
            control={control}
            rules={{ required: "Rating is required" }}
            render={({ field, fieldState }) => (
              <NumberInput
                label={"Rating"}
                placeholder="Rating..."
                min={0}
                max={5}
                required
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>

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
