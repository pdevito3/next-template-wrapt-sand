import Layout from "components/layout";
import useAuthUser from "utils/auth/useAuthUser";

Protected.isPublic = false;
export default function Protected() {
  const { session } = useAuthUser();

  return (
    <Layout>
      ProtectedPage
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </Layout>
  );
}
