import TextInput from "@/components/Forms/TextInput";
import useAutosave from "@/utils/Autosave/useAutosave";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FormMode } from "../../../components/types/index";
import { useAddUser } from "../api";
import { useUpdateUser } from "../api/updateUser";
import { UserDto, UserForCreationDto, UserForUpdateDto } from "../types/index";
import { userValidationSchema } from "../validation";

interface UserFormProps {
  userId?: string | undefined;
  userData?: UserDto;
}

function UserForm({ userId, userData }: UserFormProps) {
  let formMode = (userId ? "Edit" : "Add") as typeof FormMode[number];

  const focusField = "identifier";
  const {
    handleSubmit,
    reset,
    control,
    setFocus,
    setValue,
    watch,
    formState: { dirtyFields, isValid },
  } = useForm<UserForCreationDto | UserForUpdateDto>({
    mode: "onBlur",
    resolver: yupResolver(userValidationSchema),
    defaultValues: {
      identifier: "",
      firstName: "",
      lastName: "",
      email: "",
      username: "",
    },
  });
  const simpleIsDirty = !!Object.keys(dirtyFields).length;

  useEffect(() => {
    setFocus(focusField);
  }, [setFocus]);

  const onSubmit: SubmitHandler<UserForCreationDto | UserForUpdateDto> = (
    data
  ) => {
    formMode === "Add" ? createUser(data) : updateUser(data);
    if (formMode === "Add") setFocus(focusField);
  };

  const router = useRouter();

  const createUserApi = useAddUser();
  function createUser(data: UserForCreationDto) {
    createUserApi
      .mutateAsync(data)
      .then((data) => {
        formMode = "Edit";
        userData = data;
        router.push(`/settings/users/${data.id}`);
      })
      .then(() => {
        toast.success("User created successfully");
      })
      .catch((e) => {
        toast.error("There was an error creating the user");
        console.error(e);
      });
  }

  const updateUserApi = useUpdateUser();
  function updateUser(data: UserForUpdateDto) {
    const id = userId;
    if (id === null || id === undefined) return;

    updateUserApi
      .mutateAsync({ id, data })
      .then(() => {
        toast.success("User updated successfully");
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
        toast.error("There was an error updating the user");
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
      setValue("identifier", userData?.identifier ?? "");
      setValue("firstName", userData?.firstName ?? "");
      setValue("lastName", userData?.lastName ?? "");
      setValue("email", userData?.email ?? "");
      setValue("username", userData?.username ?? "");
      reset(
        {},
        {
          keepValues: true,
        }
      );
    }
  }, [formMode, userData, reset, setValue]);

  const watchAllFields = watch();
  useAutosave({
    handleSubmission: handleSubmit(onSubmit),
    isDirty: simpleIsDirty,
    isValid,
    formFields: watchAllFields,
    isActive: formMode === "Edit",
  });

  return (
    <>
      <div className="py-5 space-y-3">
        <button onClick={() => makeToast()}>toast 🥂</button>

        <p>
          Form is {simpleIsDirty ? "💩" : "🧼"} and {isValid ? "✅" : "❌"}
        </p>
      </div>
      {/* Need `noValidate` to allow RHF validation to trump browser validation when field is required */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="w-80">
          <Controller
            name="identifier"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label={"Identifier"}
                placeholder="Identifier..."
                testSelector="identifier"
                required={
                  // @ts-ignore
                  userValidationSchema.fields?.identifier?.exclusiveTests
                    ?.required
                }
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="w-80">
          <Controller
            name="firstName"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label={"First Name"}
                placeholder="First Name..."
                testSelector="firstName"
                required={
                  // @ts-ignore
                  userValidationSchema.fields?.firstName?.exclusiveTests
                    ?.required
                }
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="w-80">
          <Controller
            name="lastName"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label={"Last Name"}
                placeholder="Last Name..."
                testSelector="lastName"
                required={
                  // @ts-ignore
                  userValidationSchema.fields?.lastName?.exclusiveTests
                    ?.required
                }
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="w-80">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label={"Email"}
                placeholder="Email..."
                testSelector="email"
                required={
                  // @ts-ignore
                  userValidationSchema.fields?.email?.exclusiveTests?.required
                }
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="w-80">
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label={"Username"}
                placeholder="Username..."
                testSelector="username"
                required={
                  // @ts-ignore
                  userValidationSchema.fields?.username?.exclusiveTests
                    ?.required
                }
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>

        {formMode === "Add" && (
          <div className="">
            <button
              type="submit"
              className="px-3 py-2 text-white border rounded-md shadow cursor-pointer border-violet-800 bg-violet-500 dark:border-violet-500 dark:bg-transparent dark:shadow-violet-500"
            >
              Submit
            </button>
          </div>
        )}
      </form>
      <DevTool control={control} placement={"bottom-right"} />
    </>
  );
}

export { UserForm };
