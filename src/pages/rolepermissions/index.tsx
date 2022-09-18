import { PrivateLayout, SearchInput } from "@/components";
import {
  Button,
  PaginatedTableProvider,
  useGlobalFilter,
} from "@/components/forms";
import { RolePermissionListTable } from "@/domain/rolePermissions";
import "@tanstack/react-table";
import { IconCirclePlus } from "tabler-icons";

RolePermissionList.isPublic = false;
export default function RolePermissionList() {
  const {
    globalFilter,
    queryFilter,
    calculateAndSetQueryFilter,
  } = useGlobalFilter((value) => `(role|permission)@=*${value}`);

  return (
    <PrivateLayout>
      <div className="space-y-6 max-w-9xl">
        <div className="">
          <h1 className="h1">RolePermissions</h1>
          <div className="py-4">
            <PaginatedTableProvider>
              <div className="flex items-center justify-between">
                <div className="mt-1">
                  <SearchInput
                    value={globalFilter ?? ""}
                    onChange={(value) =>
                      calculateAndSetQueryFilter(String(value))
                    }
                    placeholder="Search all columns..."
                  />
                </div>

                <Button
                  buttonStyle="primary"
                  icon={<IconCirclePlus className="w-5 h-5" />}
                  href="/rolepermissions/new"
                >
                  Add RolePermission
                </Button>
              </div>

              <div className="pt-2">
                <RolePermissionListTable queryFilter={queryFilter} />
              </div>
            </PaginatedTableProvider>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
