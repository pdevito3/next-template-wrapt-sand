import {
  Button,
  Checkbox,
  ComboBox,
  DatePicker,
  NumberInput,
  TextArea,
  TextInput,
} from "@/components/forms";
import { Notifications } from "@/components/notifications";
import {
  RecipeDto,
  RecipeForCreationDto,
  RecipeForUpdateDto,
  recipeValidationSchema,
  useAddRecipe,
  useUpdateRecipe,
} from "@/domain/recipes";
import { FormMode } from "@/types";
import { getSimpleDirtyFields, useAutosave } from "@/utils";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface RecipeFormProps {
  recipeId?: string | undefined;
  recipeData?: RecipeDto;
}

function RecipeForm({ recipeId, recipeData }: RecipeFormProps) {
  const formMode = (recipeId ? "Edit" : "Add") as typeof FormMode[number];

  const focusField = "title";
  const {
    handleSubmit,
    reset,
    control,
    setFocus,
    setValue,
    watch,
    formState: { dirtyFields, isValid },
  } = useForm<RecipeForCreationDto | RecipeForUpdateDto>({
    mode: "onBlur",
    resolver: yupResolver(recipeValidationSchema),
    defaultValues: {
      title: "",
      visibility: "Public",
      directions: "",
      haveMadeItMyself: false,

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
    if (formMode === "Add") setFocus(focusField);
  };

  const createRecipeApi = useAddRecipe();
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

  const updateRecipeApi = useUpdateRecipe();
  function updateRecipe(data: RecipeForUpdateDto) {
    const id = recipeId;
    if (id === null || id === undefined) return;

    updateRecipeApi
      .mutateAsync({ id, data })
      .then(() => {
        Notifications.success("Recipe updated successfully");
      })
      .then(() => {
        reset(
          { ...data },
          {
            keepValues: true,
          }
        );
      })
      .catch((e) => {
        Notifications.error("There was an error updating the recipe");
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

  useEffect(() => {
    if (formMode === "Edit") {
      setValue("title", recipeData?.title ?? "");
      setValue("visibility", recipeData?.visibility ?? "Public");
      setValue("directions", recipeData?.directions ?? "");
      setValue("rating", recipeData?.rating);
      setValue("dateOfOrigin", recipeData?.dateOfOrigin);
      setValue("haveMadeItMyself", recipeData?.haveMadeItMyself ?? false);
      reset(
        {},
        {
          keepValues: true,
        }
      );
    }
  }, [formMode, recipeData, reset, setValue]);

  const watchAllFields = watch();
  useAutosave({
    handleSubmission: handleSubmit(onSubmit),
    isDirty: getSimpleDirtyFields(dirtyFields),
    isValid,
    formFields: watchAllFields,
  });

  return (
    <>
      {/* Need `noValidate` to allow RHF validation to trump browser validation when field is required */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="w-full sm:w-80 lg:w-96">
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label={"Title"}
                placeholder="Title..."
                testSelector="title"
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

        <div className="w-full sm:w-80 lg:w-96">
          <Controller
            name="visibility"
            control={control}
            render={({ field, fieldState }) => (
              <ComboBox
                {...field}
                label={"Visibility"}
                placeholder="Visibility..."
                testSelector="visibility"
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

        <div className="w-full sm:w-80 lg:w-96">
          <Controller
            name="directions"
            control={control}
            render={({ field, fieldState }) => (
              <TextArea
                {...field}
                label={"Directions"}
                placeholder="Directions..."
                testSelector="directions"
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

        <div className="w-full sm:w-80 lg:w-96">
          <Controller
            name="rating"
            control={control}
            render={({ field, fieldState }) => (
              <NumberInput
                {...field}
                label={"Rating"}
                placeholder="Rating..."
                testSelector="rating"
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

        <div className="w-full sm:w-80 lg:w-96">
          <Controller
            name="dateOfOrigin"
            control={control}
            render={({ field, fieldState }) => (
              <DatePicker
                {...field}
                label={"Date of Origin"}
                placeholder="Pick a date"
                testSelector="dateOfOrigin"
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
              />
            )}
          />
        </div>

        <div className="w-full sm:w-80 lg:w-96">
          <Controller
            name="haveMadeItMyself"
            control={control}
            render={({ field, fieldState }) => (
              <Checkbox
                label={"Have Made It Myself"}
                testSelector="haveMadeItMyself"
                required={
                  recipeValidationSchema.fields?.haveMadeItMyself // @ts-ignore
                    ?.exclusiveTests?.required
                }
                isSelected={field.value}
                error={fieldState?.error?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="">
          <Button buttonStyle="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
      <DevTool control={control} placement={"bottom-right"} />
    </>
  );
}

export { RecipeForm };
