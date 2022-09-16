import PrivateLayout from "@/components/PrivateLayout";
import { UserForm } from "@/domain/users";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NewUser() {
  const router = useRouter();

  return (
    <PrivateLayout>
      <div className="space-y-6">
        <Link
          className="px-3 py-2 border rounded-md border-slate-700 dark:border-white"
          // onClick={() => router.back()}
          href={"/settings"}
        >
          Back
        </Link>
        <div className="max-w-3xl py-6 space-y-5">
          <h1 className="h1">Add a User</h1>
          <div className="py-6">
            <UserForm />
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
