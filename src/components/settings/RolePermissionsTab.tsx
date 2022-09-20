import { SearchInput } from "@/components";
import { PaginatedTableProvider, useGlobalFilter } from "@/components/forms";
import {
  RolePermissionForm,
  RolePermissionListTable,
} from "@/domain/rolePermissions";
import "@tanstack/react-table";

function RolePermissionsTab() {
  const { globalFilter, queryFilter, calculateAndSetQueryFilter } =
    useGlobalFilter((value) => `(role|permission)@=*${value}`);

  return (
    <>
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="h2">Add a Role Permission</h2>
          <div className="hidden md:block">
            <RolePermissionForm direction="horizontal" />
          </div>
          <div className="block md:hidden">
            <RolePermissionForm direction="vertical" />
          </div>
        </div>
        <div className="flex-1">
          <PaginatedTableProvider>
            <div className="flex-col items-start space-y-4 lg:space-y-0 lg:flex-row lg:flex lg:items-center lg:justify-between">
              <h2 className="block h2">Role Permissions</h2>
              <div className="py-1">
                <SearchInput
                  value={globalFilter ?? ""}
                  onChange={(value) =>
                    calculateAndSetQueryFilter(String(value))
                  }
                  placeholder="Search all columns..."
                  className="block"
                />
              </div>
            </div>

            <div className="pt-2">
              <RolePermissionListTable queryFilter={queryFilter} />
            </div>
          </PaginatedTableProvider>
        </div>
      </div>
    </>
  );
}

export { RolePermissionsTab };
