import { PrivateLayout } from "@/components";
import { Button } from "@/components/forms";
import {
  RolePermissionForm,
  useGetRolePermission,
} from "@/domain/rolePermissions";
import { useRouter } from "next/router";

export default function EditRolePermission() {
  const router = useRouter();
  const { rolePermissionId } = router.query;
  const { data: rolePermissionData } = useGetRolePermission(
    rolePermissionId?.toString() ?? ""
  );

  return (
    <PrivateLayout>
      <div className="space-y-6">
        <Button buttonStyle="secondary" href={"/settings"}>
          Back
        </Button>
        <div className="">
          <h1 className="h1">Edit Role Permission</h1>
          <div className="max-w-3xl py-6 space-y-5">
            <RolePermissionForm
              rolePermissionId={rolePermissionId?.toString()}
              rolePermissionData={rolePermissionData}
            />
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
