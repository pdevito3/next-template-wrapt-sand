import PrivateLayout from "@/components/layout";
import useAuthUser from "@/features/auth/hooks/useAuthUser";

// Protected.isPublic = false;
export default function Protected() {
  const { session } = useAuthUser();

  return (
    <PrivateLayout>
      <div className="max-w-lg whitespace-pre-wrap">
        ProtectedPage
        <p className="whitespace-wrap">{JSON.stringify(session, null, 2)}</p>
      </div>
    </PrivateLayout>
  );
}
