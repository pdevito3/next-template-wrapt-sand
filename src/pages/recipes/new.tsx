import { PrivateLayout } from "@/components";
import { Button } from "@/components/forms";
import { RecipeForm } from "@/domain/recipes";

export default function NewRecipe() {
  return (
    <PrivateLayout>
      <div className="space-y-6">
        <Button
          className="px-3 py-2 border rounded-md border-slate-700 dark:border-white"
          href={"/recipes"}
        >
          Back
        </Button>
        <div className="">
          <h1 className="h1">Add a Recipe</h1>
          <div className="py-6">
            <RecipeForm />
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
