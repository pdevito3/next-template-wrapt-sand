import PrivateLayout from "@/components/PrivateLayout";
import { RolesForm } from "@/domain/roles/features/RolesForm";
import { useGetUser } from "@/domain/users/api";
import { UserForm } from "@/domain/users/features/UserForm";
import Link from "next/link";
import { useRouter } from "next/router";

export default function EditUser() {
  const router = useRouter();
  const { userId } = router.query;
  const { data: userData } = useGetUser(userId?.toString() ?? "");

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
          <h1 className="h1">Edit User</h1>
          <div className="max-w-3xl py-6 space-y-5">
            <div className="space-y-3">
              <h2 className="h2">Users</h2>
              <UserForm userId={userId?.toString()} userData={userData} />
            </div>

            <div className="pt-5 space-y-3 lg:pt-0">
              <h2 className="h2">Manage Roles</h2>
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
