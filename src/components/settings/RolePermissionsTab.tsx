import { SearchInput } from "@/components";
import {
  Button,
  PaginatedTableProvider,
  useGlobalFilter,
} from "@/components/forms";
import { RolePermissionListTable } from "@/domain/rolePermissions";
import "@tanstack/react-table";
import { IconCirclePlus } from "tabler-icons";

function RolePermissionsTab() {
  const { globalFilter, queryFilter, calculateAndSetQueryFilter } =
    useGlobalFilter((value) => `(role|permission)@=*${value}`);

  return (
    <>
      <h2 className="h2">Role Permissions</h2>
      <div className="py-4">
        <PaginatedTableProvider>
          <div className="flex items-center justify-between">
            <div className="mt-1">
              <SearchInput
                value={globalFilter ?? ""}
                onChange={(value) => calculateAndSetQueryFilter(String(value))}
                placeholder="Search all columns..."
              />
            </div>

            <Button
              href="settings/rolepermissions/new"
              icon={<IconCirclePlus className="w-5 h-5" />}
            >
              Add Role Permission
            </Button>
          </div>

          <div className="pt-2">
            <RolePermissionListTable queryFilter={queryFilter} />
          </div>
        </PaginatedTableProvider>
      </div>
    </>
  );
}

export { RolePermissionsTab };
