import {
  Button,
  PaginatedTableProvider,
  useGlobalFilter,
} from "@/components/forms";
import SearchInput from "@/components/SearchInput";
import { RecipeListTable } from "@/domain/recipes";
import "@tanstack/react-table";
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

                <Button
                  buttonStyle="primary"
                  icon={<IconCirclePlus className="w-5 h-5" />}
                  renderAs="link"
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
