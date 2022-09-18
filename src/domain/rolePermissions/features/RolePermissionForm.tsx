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
  RolePermissionDto,
  RolePermissionForCreationDto,
  RolePermissionForUpdateDto,
  rolePermissionValidationSchema,
  useAddRolePermission,
  useUpdateRolePermission,
} from "@/domain/rolePermissions";
import { FormMode } from "@/types";
import { getSimpleDirtyFields, useAutosave } from "@/utils";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface RolePermissionFormProps {
  rolePermissionId?: string | undefined;
  rolePermissionData?: RolePermissionDto;
}

function RolePermissionForm({ rolePermissionId, rolePermissionData }: RolePermissionFormProps) {
  const formMode = (rolePermissionId ? "Edit" : "Add") as typeof FormMode[number];

  const focusField = "role";
  const {
    handleSubmit,
    reset,
    control,
    setFocus,
    setValue,
    watch,
    formState: { dirtyFields, isValid },
  } = useForm<RolePermissionForCreationDto | RolePermissionForUpdateDto>({
    mode: "onBlur",
    resolver: yupResolver(rolePermissionValidationSchema),
    defaultValues: {
      role: "",
      permission: "",
    },
  });

  useEffect(() => {
    setFocus(focusField);
  }, [setFocus]);

  const onSubmit: SubmitHandler<RolePermissionForCreationDto | RolePermissionForUpdateDto> = (
    data
  ) => {
    formMode === "Add" ? createRolePermission(data) : updateRolePermission(data);
    if (formMode === "Add") setFocus(focusField);
  };

  const createRolePermissionApi = useAddRolePermission();
  function createRolePermission(data: RolePermissionForCreationDto) {
    createRolePermissionApi
      .mutateAsync(data)
      .then(() => {
        Notifications.success("RolePermission created successfully");
      })
      .then(() => {
        reset();
      })
      .catch((e) => {
        Notifications.error("There was an error creating the rolePermission");
        console.error(e);
      });
  }

  const updateRolePermissionApi = useUpdateRolePermission();
  function updateRolePermission(data: RolePermissionForUpdateDto) {
    const id = rolePermissionId;
    if (id === null || id === undefined) return;

    updateRolePermissionApi
      .mutateAsync({ id, data })
      .then(() => {
        Notifications.success("RolePermission updated successfully");
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
        Notifications.error("There was an error updating the RolePermission");
        console.error(e);
      });
  }

  useEffect(() => {
    if (formMode === "Edit") {
      
      setValue("role", rolePermissionData?.role ?? "");
      setValue("permission", rolePermissionData?.permission ?? "");
      reset(
        {},
        {
          keepValues: true,
        }
      );
    }
  }, [formMode, rolePermissionData, reset, setValue]);

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
            name="role"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label={"Role"}
                placeholder="Role..."
                testSelector="role"
                required={
                  // @ts-ignore
                  rolePermissionValidationSchema.fields?.role
                    ?.exclusiveTests?.required
                }
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>

        {/* OR use a TextArea... */}

        <div className="w-full sm:w-80 lg:w-96">
          <Controller
            name="role"
            control={control}
            render={({ field, fieldState }) => (
              <TextArea
                {...field}
                label={"Role"}
                placeholder="Role..."
                testSelector="role"
                minRows={2}
                autosize
                resize="y"
                required={
                  // @ts-ignore
                  rolePermissionValidationSchema.fields?.role?.exclusiveTests
                    ?.required
                }
                error={fieldState.error?.message}
              />
            )}
          />
        </div>

        <div className="w-full sm:w-80 lg:w-96">
          <Controller
            name="permission"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label={"Permission"}
                placeholder="Permission..."
                testSelector="permission"
                required={
                  // @ts-ignore
                  rolePermissionValidationSchema.fields?.permission
                    ?.exclusiveTests?.required
                }
                error={fieldState.error?.message}
                {...field}
              />
            )}
          />
        </div>

        {/* OR use a TextArea... */}

        <div className="w-full sm:w-80 lg:w-96">
          <Controller
            name="permission"
            control={control}
            render={({ field, fieldState }) => (
              <TextArea
                {...field}
                label={"Permission"}
                placeholder="Permission..."
                testSelector="permission"
                minRows={2}
                autosize
                resize="y"
                required={
                  // @ts-ignore
                  rolePermissionValidationSchema.fields?.permission?.exclusiveTests
                    ?.required
                }
                error={fieldState.error?.message}
              />
            )}
          />
        </div>

        {formMode === "Add" && (
          <Button buttonStyle="primary" type="submit">
            Submit
          </Button>
        )}
      </form>
      <DevTool control={control} placement={"bottom-right"} />
    </>
  );
}

export { RolePermissionForm };