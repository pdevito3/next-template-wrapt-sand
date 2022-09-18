import { PrivateLayout } from "@/components";
import useAuthUser from "@/domain/auth/hooks/useAuthUser";

// Protected.isPublic = false;
export default function Protected() {
  const { session } = useAuthUser();

  return (
    <PrivateLayout>
      <div className="max-w-lg whitespace-pre-wrap">
        <h1 className="h1">Token Info</h1>
        <p className="whitespace-wrap">{JSON.stringify(session, null, 2)}</p>
      </div>
    </PrivateLayout>
  );
}
