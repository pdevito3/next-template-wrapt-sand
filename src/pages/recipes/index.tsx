import { PrivateLayout, SearchInput } from "@/components";
import {
  Button,
  PaginatedTableProvider,
  useGlobalFilter,
} from "@/components/forms";
import { RecipeListTable } from "@/domain/recipes";
import { IconCirclePlus } from "@tabler/icons";
import "@tanstack/react-table";

RecipeList.isPublic = false;
export default function RecipeList() {
  const {
    globalFilter: globalRecipeFilter,
    queryFilter: queryFilterForRecipes,
    calculateAndSetQueryFilter,
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
                      calculateAndSetQueryFilter(String(value))
                    }
                    placeholder="Search all columns..."
                  />
                </div>

                <Button
                  buttonStyle="primary"
                  icon={<IconCirclePlus className="w-5 h-5" />}
                  href="/recipes/new"
                >
                  Add Recipe
                </Button>
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
