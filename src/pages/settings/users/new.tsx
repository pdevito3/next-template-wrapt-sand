import { PrivateLayout } from "@/components";
import { Button } from "@/components/forms";
import { UserForm } from "@/domain/users";

export default function NewUser() {
  return (
    <PrivateLayout>
      <div className="space-y-6">
        <Button buttonStyle="secondary" href={"/settings"}>
          Back
        </Button>
        <div className="">
          <h1 className="h1">Add a User</h1>
          <div className="max-w-3xl py-6 space-y-5">
            <UserForm />
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
