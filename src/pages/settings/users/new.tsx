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
          href={"/settings/users"}
        >
          Back
        </Link>
        <div className="">
          <h1 className="max-w-4xl text-2xl font-medium tracking-tight font-display text-slate-900 dark:text-gray-50 sm:text-4xl">
            Add a User
          </h1>
          <div className="py-6">
            <UserForm />
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
