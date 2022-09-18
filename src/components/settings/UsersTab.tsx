import {
  Button,
  DebouncedInput,
  PaginatedTableProvider,
  useGlobalFilter,
} from "@/components/forms";
import { UserListTable } from "@/domain/users";
import "@tanstack/react-table";
import { IconCirclePlus, IconSearch } from "tabler-icons";

function UsersTab() {
  const {
    globalFilter: globalUserFilter,
    queryFilter: queryFilterForUsers,
    calculateAndSetQueryFilter,
  } = useGlobalFilter(
    (value) => `(firstName|lastName|identifier|username)@=*${value}`
  );
  // TODO add email filter separately due to Value Object

  return (
    <>
      <h2 className="h2">Users</h2>
      <div className="py-4">
        {/* prefer this. more composed approach */}
        <PaginatedTableProvider>
          <div className="flex items-center justify-between">
            {/* TODO: abstract to an input that can use the debounce input under the hood */}
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IconSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>

              <DebouncedInput
                value={globalUserFilter ?? ""}
                onChange={(value) => calculateAndSetQueryFilter(String(value))}
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg outline-none w-80 bg-gray-50 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"
                placeholder="Search all columns..."
              />
            </div>

            <Button
              href="settings/users/new"
              icon={<IconCirclePlus className="w-5 h-5" />}
            >
              Add User
            </Button>
          </div>

          <div className="pt-2">
            <UserListTable queryFilter={queryFilterForUsers} />
          </div>
        </PaginatedTableProvider>
      </div>
    </>
  );
}

export default UsersTab;
