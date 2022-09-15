import ComboBox from "@/components/Forms/Combobox";
import TrashButton from "@/components/Forms/TrashButton";
import { useAddUserRole } from "@/domain/users/api/addUserRole";
import { useRemoveUserRole } from "@/domain/users/api/removeUserRole";
import { DevTool } from "@hookform/devtools";
import clsx from "clsx";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useGetRoles } from "../api/getRoles";

interface RolesFormProps {
  userId: string;
  assignedRoles?: string[];
  shouldSetFocus?: boolean;
}

interface RoleToSubmit {
  role: string;
}

function RolesForm({
  userId,
  assignedRoles,
  shouldSetFocus = false,
}: RolesFormProps) {
  const focusField = "role";
  const { handleSubmit, reset, control, setFocus } = useForm<RoleToSubmit>({
    defaultValues: {
      role: "",
    },
  });

  useEffect(() => {
    shouldSetFocus && setFocus(focusField);
  }, [setFocus, shouldSetFocus]);

  const onSubmit: SubmitHandler<RoleToSubmit> = (data) => {
    addRole(data.role);
    if (shouldSetFocus) setFocus(focusField);
  };

  const { data: rolesList } = useGetRoles();
  const addRoleApi = useAddUserRole();
  function addRole(role: string) {
    addRoleApi
      .mutateAsync({ userId, role })
      .then(() => {
        toast.success("Role added successfully");
      })
      .then(() => {
        reset();
      })
      .catch((e) => {
        toast.error("There was an error adding the role");
        console.error(e);
      });
  }
  const removeRoleApi = useRemoveUserRole();
  function removeRole(role: string) {
    removeRoleApi
      .mutateAsync({ userId, role })
      .then(() => {
        toast.success("Role removed successfully");
      })
      .then(() => {
        reset();
      })
      .catch((e) => {
        toast.error("There was an error removing the role");
        console.error(e);
      });
  }

  function getRolesList() {
    return (
      rolesList
        ?.filter((item) => !assignedRoles?.includes(item))
        ?.map((role) => ({ value: role, label: role })) ?? []
    );
    // return rolesList?.map((role) => ({ value: role, label: role }));
  }

  return (
    <>
      {/* Need `noValidate` to allow RHF validation to trump browser validation when field is required */}
      <form
        className="flex items-end justify-start space-x-3"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="w-80">
          <Controller
            name="role"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <ComboBox
                {...field}
                label={"Role"}
                placeholder="Role..."
                testSelector="role"
                data={getRolesList() ?? []}
                clearable
                required={true}
                searchable
                disabled={getRolesList()?.length <= 0}
                error={fieldState.error?.message}
              />
            )}
          />
        </div>

        <div className="">
          <button
            type="submit"
            disabled={getRolesList()?.length <= 0}
            className={clsx(
              "px-3 py-2 text-white border rounded-md shadow cursor-pointer border-violet-800 bg-violet-500",
              "dark:border-violet-500 dark:bg-transparent dark:shadow-violet-500",
              "dark:disabled:bg-slate-900 disabled:cursor-not-allowed dark:disabled:border-slate-800 dark:disabled:shadow-slate-600"
            )}
          >
            Assign
          </button>
        </div>
      </form>
      <h2 className="text-lg font-medium tracking-tight font-display text-slate-900 dark:text-gray-50 sm:text-xl">
        Assigned Roles
      </h2>
      <div className="p-2 mt-3 space-y-2 border rounded-md shadow dark:border-slate-800">
        {
          <>
            {assignedRoles && assignedRoles?.length > 0 ? (
              assignedRoles?.map((role) => (
                <div
                  className="flex items-center justify-between w-full px-4 py-2 rounded-md group hover:bg-slate-50 dark:hover:bg-slate-600"
                  key={role}
                >
                  <p className="flex-1 w-full select-none">{role}</p>

                  <div className="flex items-center justify-center">
                    <TrashButton
                      onClick={() => {
                        removeRole(role);
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <>No roles assigned</>
            )}
          </>
        }
      </div>
      <DevTool control={control} placement={"bottom-right"} />
    </>
  );
}

export { RolesForm };
