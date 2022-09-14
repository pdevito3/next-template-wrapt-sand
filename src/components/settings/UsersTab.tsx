import { PaginatedTableProvider, useGlobalFilter } from "@/components/Forms";
import DebouncedInput from "@/components/Forms/DebouncedInput";
import { UserListTable } from "@/domain/users";
import "@tanstack/react-table";
import Link from "next/link";
import { IconCirclePlus, IconSearch } from "tabler-icons";

function UsersTab() {
  const {
    globalFilter: globalUserFilter,
    queryFilter: queryFilterForUsers,
    calculateAndSetQueryFilter,
  } = useGlobalFilter((value) => `(firstName|lastName)@=*${value}`);

  return (
    <>
      <h2 className="text-xl font-medium tracking-tight font-display text-slate-900 dark:text-gray-50 sm:text-3xl">
        Users
      </h2>
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

            <Link
              className="px-2 py-2 text-white transition-all bg-green-500 border-green-800 rounded-md shadow-md dark:border-green-500 dark:bg-slate-900 dark:shadow-green-500 hover:bg-green-400 hover:dark:bg-slate-800"
              href="settings/users/new"
            >
              <IconCirclePlus className="w-5 h-5" />
            </Link>
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
