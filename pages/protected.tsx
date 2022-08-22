import useAuthUser from "components/auth/hooks/useAuthUser";
import Layout from "components/layout";

// Protected.isPublic = false;
export default function Protected() {
  const { session } = useAuthUser();

  return (
    <Layout>
      ProtectedPage
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </Layout>
  );
}
