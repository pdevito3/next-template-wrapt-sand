import PrivateLayout from "@/components/PrivateLayout";
import { RolesForm } from "@/domain/roles/features/RolesForm";
import { useGetUser } from "@/domain/users/api";
import { UserForm } from "@/domain/users/features/UserForm";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function EditUser() {
  const router = useRouter();
  const { userId } = router.query;
  const { data } = useGetUser(userId?.toString());

  const initialValues = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "next", label: "Next.js" },
    { value: "blitz", label: "Blitz.js" },
    { value: "gatsby", label: "Gatsby.js" },
    { value: "vue", label: "Vue" },
    { value: "jq", label: "jQuery" },
  ];

  const [user, setUser] = useState();
  const { data: userData } = useGetUser(userId?.toString() ?? "");
  console.log(userData);

  const [listValue, setListValue] = useState<string | null>(null);
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
          <div className="max-w-3xl py-6 lg:flex lg:justify-between">
            <div className="space-y-3">
              <h2 className="text-xl font-medium tracking-tight font-display text-slate-900 dark:text-gray-50 sm:text-3xl">
                Users
              </h2>
              <UserForm userId={userId?.toString()} userData={data} />
            </div>

            <div className="pt-5 space-y-3 lg:pt-0">
              <h2 className="text-xl font-medium tracking-tight font-display text-slate-900 dark:text-gray-50 sm:text-3xl">
                Roles
              </h2>
              <RolesForm
                userId={userId?.toString() ?? ""}
                assignedRoles={userData?.roles}
              />
            </div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
