import { Notifications } from "@/components/notifications";
import Login from "@/domain/auth/components/login";
import useAuthUser from "@/domain/auth/hooks/useAuthUser";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// const appendCache = createEmotionCache({ key: "mantine", prepend: false });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>New Wrapt App in Next</title>

      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <QueryClientProvider client={new QueryClient()}>
          <RouteGuard isPublic={Component.isPublic}>
            <MantineProvider
            // emotionCache={appendCache}
            // withGlobalStyles
            // withNormalizeCSS
            >
              <ModalsProvider>
                <Component {...pageProps} />
              </ModalsProvider>
              <ReactQueryDevtools initialIsOpen={false} />
              <Notifications />
            </MantineProvider>
          </RouteGuard>
        </QueryClientProvider>
      </SessionProvider>
    </>
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
