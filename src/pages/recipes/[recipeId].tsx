import { PrivateLayout } from "@/components";
import { Button } from "@/components/forms";
import { RecipeForm, useGetRecipe } from "@/domain/recipes";
import { useRouter } from "next/router";

export default function EditRecipe() {
  const router = useRouter();
  const { recipeId } = router.query;
  const { data } = useGetRecipe(recipeId?.toString());

  return (
    <PrivateLayout>
      <div className="space-y-6">
        <Button href={"/recipes"}>Back</Button>
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
