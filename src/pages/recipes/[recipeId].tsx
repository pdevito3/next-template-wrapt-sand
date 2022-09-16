import PrivateLayout from "@/components/PrivateLayout";
import { useGetRecipe } from "@/domain/recipes/api";
import { RecipeForm } from "@/domain/recipes/features/RecipeForm";
import Link from "next/link";
import { useRouter } from "next/router";

export default function EditRecipe() {
  const router = useRouter();
  const { recipeId } = router.query;
  const { data } = useGetRecipe(recipeId?.toString());

  return (
    <PrivateLayout>
      <div className="space-y-6">
        <Link
          className="px-3 py-2 border rounded-md border-slate-700 dark:border-white"
          // onClick={() => router.back()}
          href={"/recipes"}
        >
          Back
        </Link>
        <div className="">
          <h1 className="h1">Edit Recipe</h1>
          <div className="py-6">
            <RecipeForm recipeId={recipeId?.toString()} recipeData={data} />
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
