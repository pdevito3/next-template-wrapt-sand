// import AccessDenied from "components/auth/AccessDenied";
import Login from "@/components/auth/components/login";
import useAuthUser from "@/components/auth/hooks/useAuthUser";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <RouteGuard isPublic={Component.isPublic}>
        <Component {...pageProps} />
      </RouteGuard>
    </SessionProvider>
  );
}

interface RouteGuardProps {
  children: React.ReactNode;
  isPublic: boolean;
}
function RouteGuard({ children, isPublic }: RouteGuardProps) {
  const { isLoggedIn, isLoading } = useAuthUser();

  if (isPublic) return <>{children}</>;

  if (typeof window !== undefined && isLoading) return null;
  if (!isLoggedIn) return <Login />;

  return <>{children}</>;
}

export default MyApp;
