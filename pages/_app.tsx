import { SessionProvider, signIn } from "next-auth/react";
import type { AppProps } from "next/app";
import useAuthUser from "utils/auth/useAuthUser";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <RouteGuard isPublic={Component?.isPublic}>
        <Component {...pageProps} />
      </RouteGuard>
    </SessionProvider>
  );
}

interface RouteGuardProps {
  children: React.ReactNode;
  isPublic?: boolean;
}
function RouteGuard({ children, isPublic = false }: RouteGuardProps) {
  const { isLoggedIn, isLoading } = useAuthUser();

  if (isPublic) return <>{children}</>;

  if (typeof window !== undefined && isLoading) return null;
  if (!isLoggedIn) {
    signIn("oidc");
    return null;
  }

  return <>{children}</>;
}

export default MyApp;
