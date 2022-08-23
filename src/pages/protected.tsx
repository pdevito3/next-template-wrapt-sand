import useAuthUser from "@/components/auth/hooks/useAuthUser";
import Layout from "@/components/layout";

// Protected.isPublic = false;
export default function Protected() {
  const { session } = useAuthUser();

  return (
    <Layout>
      <div className="max-w-lg whitespace-pre-wrap">
        ProtectedPage
        <p className="whitespace-wrap">{JSON.stringify(session, null, 2)}</p>
      </div>
    </Layout>
  );
}
