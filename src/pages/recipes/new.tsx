import PrivateLayout from "@/components/PrivateLayout";
import { RecipeForm } from "@/domain/recipes";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NewRecipe() {
  const router = useRouter();

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
          <h1 className="h1">Add a Recipe</h1>
          <div className="py-6">
            <RecipeForm />
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
