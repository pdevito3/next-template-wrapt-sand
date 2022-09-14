import PrivateLayout from "@/components/PrivateLayout";
import { useGetUser } from "@/domain/users/api";
import { UserForm } from "@/domain/users/features/UserForm";
import Link from "next/link";
import { useRouter } from "next/router";

export default function EditUser() {
  const router = useRouter();
  const { userId } = router.query;
  const { data } = useGetUser(userId?.toString());

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
        <div className="">
          <h1 className="max-w-4xl text-2xl font-medium tracking-tight font-display text-slate-900 dark:text-gray-50 sm:text-4xl">
            Edit User
          </h1>
          <div className="py-6">
            <UserForm userId={userId?.toString()} userData={data} />
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
