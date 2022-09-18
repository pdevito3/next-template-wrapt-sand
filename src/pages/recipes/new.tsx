import { PrivateLayout } from "@/components";
import { Button } from "@/components/forms";
import { RecipeForm } from "@/domain/recipes";
import { useRouter } from "next/router";

export default function NewRecipe() {
  const router = useRouter();

  return (
    <PrivateLayout>
      <div className="space-y-6">
        <Button
          className="px-3 py-2 border rounded-md border-slate-700 dark:border-white"
          // onClick={() => router.back()}
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
