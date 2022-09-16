import { PaginatedTableProvider, useGlobalFilter } from "@/components/forms";
import SearchInput from "@/components/SearchInput";
import { RecipeListTable } from "@/domain/recipes";
import "@tanstack/react-table";
import Link from "next/link";
import { IconCirclePlus } from "tabler-icons";
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
          <h1 className="h1">Recipes</h1>
          <div className="py-4">
            <PaginatedTableProvider>
              <div className="flex items-center justify-between">
                <div className="mt-1">
                  <SearchInput
                    value={globalRecipeFilter ?? ""}
                    onChange={(value) =>
                      calculateAndSetQueryFilterForRecipes(String(value))
                    }
                    placeholder="Search all columns..."
                  />
                </div>

                <Link
                  className="px-2 py-2 text-white transition-all bg-green-500 border-green-800 rounded-md shadow-md dark:border-green-500 dark:bg-slate-900 dark:shadow-green-500 hover:bg-green-400 hover:dark:bg-slate-800"
                  href="/recipes/new"
                >
                  <IconCirclePlus className="w-5 h-5" />
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
