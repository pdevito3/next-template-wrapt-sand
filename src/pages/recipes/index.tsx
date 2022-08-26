import { PaginatedTableProvider, useGlobalFilter } from "@/components/Forms";
import DebouncedInput from "@/components/Forms/DebouncedInput";
import { RecipeListTable } from "@/domain/recipes";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import "@tanstack/react-table";
import Link from "next/link";
import PrivateLayout from "../../components/PrivateLayout";

RecipeList.isPublic = false;
export default function RecipeList() {
  const {
    globalFilter: globalRecipeFilter,
    queryFilter: queryFilterForRecipes,
    calculateAndSetQueryFilter: calculateAndSetQueryFilterForRecipes,
  } = useGlobalFilter((value) => `(title|visibility|directions)@=*${value}`);

  return (
    <PrivateLayout>
      <div className="space-y-6 max-w-9xl">
        <div className="">
          <h1 className="max-w-4xl text-2xl font-medium tracking-tight font-display text-slate-900 dark:text-gray-50 sm:text-4xl">
            Recipes
          </h1>
          <div className="py-4">
            {/* prefer this. more composed approach */}
            <PaginatedTableProvider>
              <div className="flex items-center justify-between">
                {/* TODO: abstract to an input that can use the debounce input under the hood */}
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <DebouncedInput
                    value={globalRecipeFilter ?? ""}
                    onChange={(value) =>
                      calculateAndSetQueryFilterForRecipes(String(value))
                    }
                    className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg outline-none w-80 bg-gray-50 focus:border-violet-500 focus:ring-violet-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-violet-500 dark:focus:ring-violet-500"
                    placeholder="Search all columns..."
                  />
                </div>

                <Link
                  className="px-2 py-2 text-white transition-all bg-green-500 border-green-800 rounded-md shadow-md dark:border-green-500 dark:bg-slate-900 dark:shadow-green-500 hover:bg-green-400 hover:dark:bg-slate-800"
                  href="/recipes/new"
                >
                  <PlusCircleIcon className="w-5 h-5" />
                </Link>
              </div>

              <div className="pt-2">
                <RecipeListTable queryFilter={queryFilterForRecipes} />
              </div>
            </PaginatedTableProvider>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
