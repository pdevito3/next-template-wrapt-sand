import { PrivateLayout } from "@/components";
import { Button } from "@/components/forms";
import { RolePermissionForm, useGetRolePermission } from "@/domain/rolePermissions";
import { useRouter } from "next/router";

export default function EditUser() {
  const router = useRouter();
  const { rolePermissionId } = router.query;
  const { data } = useGetRolePermission(rolePermissionId?.toString());

  return (
    <PrivateLayout>
      <div className="space-y-6">
        <Button buttonStyle="secondary" href={"/rolepermissions"}>
          Back
        </Button>
        <div className="">
          <h1 className="h1">Edit RolePermission</h1>
          <div className="max-w-3xl py-6 space-y-5">
            <RolePermissionForm rolePermissionId={rolePermissionId?.toString()} rolePermissionData={data} />
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}