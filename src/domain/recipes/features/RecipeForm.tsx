import ComboBox from "@/components/Forms/Combobox";
import DatePicker from "@/components/Forms/DatePicker";
import NumberInput from "@/components/Forms/NumberInput";
import Textarea from "@/components/Forms/Textarea";
import TextInput from "@/components/Forms/TextInput";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { FormMode } from "../../../components/types/index";
import { useAddRecipe } from "../api";
import { useUpdateRecipe } from "../api/updateRecipe";
import {
  RecipeDto,
  RecipeForCreationDto,
  RecipeForUpdateDto,
} from "../types/index";
import { recipeValidationSchema } from "../validation";

interface RecipeFormProps {
  recipeId?: string | undefined;
  recipeData?: RecipeDto;
}

function RecipeForm({ recipeId, recipeData }: RecipeFormProps) {
  const formMode = (recipeId ? "Edit" : "Add") as typeof FormMode[number];

  const focusField = "title";
  const { handleSubmit, reset, control, setFocus, setValue } = useForm<
    RecipeForCreationDto | RecipeForUpdateDto
  >({
    resolver: yupResolver(recipeValidationSchema),
    defaultValues: {
      title: "",
      visibility: "Public",
      directions: "",

      // @ts-ignore -- need default value to reset form
      dateOfOrigin: null,
    },
  });

  useEffect(() => {
    setFocus(focusField);
  }, [setFocus]);

  const onSubmit: SubmitHandler<RecipeForCreationDto | RecipeForUpdateDto> = (
    data
  ) => {
    formMode === "Add" ? createRecipe(data) : updateRecipe(data);
    setFocus(focusField);
  };

  const createRecipeApi = useAddRecipe();
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

  const updateRecipeApi = useUpdateRecipe();
  function updateRecipe(data: RecipeForUpdateDto) {
    const id = recipeId;
    if (id === null || id === undefined) return;

    updateRecipeApi
      .mutateAsync({ id, data })
      .then(() => {
        toast.success("Recipe updated successfully");
      })
      .then(() => {
        reset();
      })
      .catch((e) => {
        toast.error("There was an error updating the recipe");
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

  // TODO update to machine
  // TODO optimistic update to prevent data flash on save?
  useEffect(() => {
    if (formMode === "Edit") {
      setValue("title", recipeData?.title ?? "");
      setValue("visibility", recipeData?.visibility ?? "Public");
      setValue("directions", recipeData?.directions ?? "");
      setValue("rating", recipeData?.rating);
      setValue("dateOfOrigin", recipeData?.dateOfOrigin);
    }
  }, [recipeData]);

  const doo = useWatch({
    control,
    name: "dateOfOrigin",
  });

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
            render={({ field, fieldState }) => (
              <TextInput
                label={"Title"}
                placeholder="Title..."
                required={
                  // @ts-ignore
                  recipeValidationSchema.fields?.title?.exclusiveTests?.required
                }
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
            render={({ field, fieldState }) => (
              <ComboBox
                {...field}
                label={"Visibility"}
                placeholder="Visibility..."
                data={["Public", "Private"]}
                clearable
                required={
                  // @ts-ignore
                  recipeValidationSchema.fields?.visibility?.exclusiveTests
                    ?.required
                }
                searchable
                error={fieldState.error?.message}
              />
            )}
          />
        </div>

        <div className="w-80">
          <Controller
            name="directions"
            control={control}
            render={({ field, fieldState }) => (
              <Textarea
                {...field}
                label={"Directions"}
                placeholder="Directions..."
                minRows={2}
                autosize
                resize="y"
                required={
                  // @ts-ignore
                  recipeValidationSchema.fields?.directions?.exclusiveTests
                    ?.required
                }
                error={fieldState.error?.message}
              />
            )}
          />
        </div>

        <div className="w-80">
          <Controller
            name="rating"
            control={control}
            render={({ field, fieldState }) => (
              <NumberInput
                {...field}
                label={"Rating"}
                placeholder="Rating..."
                min={0}
                max={5}
                required={
                  // @ts-ignore
                  recipeValidationSchema.fields?.rating?.exclusiveTests
                    ?.required
                }
                error={fieldState.error?.message}
              />
            )}
          />
        </div>

        <div className="w-80">
          <Controller
            name="dateOfOrigin"
            control={control}
            rules={{ required: "Date Of Origin is required" }}
            render={({ field, fieldState }) => (
              <DatePicker
                label={"Date of Origin"}
                placeholder="Pick a date"
                withAsterisk={
                  // @ts-ignore
                  recipeValidationSchema.fields?.dateOfOrigin?.exclusiveTests
                    ?.required
                }
                required={
                  // @ts-ignore
                  recipeValidationSchema.fields?.dateOfOrigin?.exclusiveTests
                    ?.required
                }
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
          <p>date of origin: {doo?.toISOString()}</p>
        </div>

        <div className="">
          <button
            type="submit"
            className="px-3 py-2 text-white border rounded-md shadow cursor-pointer border-violet-800 bg-violet-500 dark:border-violet-500 dark:bg-transparent dark:shadow-violet-500"
          >
            Submit
          </button>
        </div>
      </form>
      <DevTool control={control} placement={"bottom-right"} />
    </>
  );
}

export { RecipeForm };
