import { PrivateLayout } from "@/components";
import { Button } from "@/components/forms";
import { RolePermissionForm } from "@/domain/rolePermissions";

export default function NewRolePermission() {
  return (
    <PrivateLayout>
      <div className="space-y-6">
        <Button buttonStyle="secondary" href={"/settings"}>
          Back
        </Button>
        <div className="">
          <h1 className="h1">Add a Role Permission</h1>
          <div className="max-w-3xl py-6 space-y-5">
            <RolePermissionForm />
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
