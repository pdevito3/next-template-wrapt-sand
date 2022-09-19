import { PrivateLayout } from "@/components";
import { Button } from "@/components/forms";
import { RolePermissionForm } from "@/domain/rolePermissions";
import Head from "next/head";

export default function NewRolePermission() {
  return (
    <>
      <Head>
        <title>Add Role Permission</title>
      </Head>

      <PrivateLayout>
        <div className="space-y-6">
          <div className="pt-4">
            <Button buttonStyle="secondary" href={"/settings"}>
              Back
            </Button>
          </div>
          <div className="">
            <h1 className="h1">Add a Role Permission</h1>
            <div className="max-w-3xl py-6 space-y-5">
              <RolePermissionForm />
            </div>
          </div>
        </div>
      </PrivateLayout>
    </>
  );
}
