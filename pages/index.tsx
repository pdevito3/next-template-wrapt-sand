import Layout from "components/layout";
import type { NextPage } from "next";
import { signIn, signOut } from "next-auth/react";
import Head from "next/head";
import useAuthUser from "utils/auth/useAuthUser";

const Home: NextPage = () => {
  const { session } = useAuthUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* TODO Layout */}

      <Layout>
        {!session && (
          <>
            <span className="">You are not signed in</span>
            <button
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              onClick={(e) => {
                e.preventDefault();
                signIn("oidc");
              }}
            >
              Sign in
            </button>
          </>
        )}
        {session?.user && (
          <>
            {session.user.image && (
              <span
                style={{ backgroundImage: `url('${session.user.image}')` }}
                className="w-32 h-32 rounded-full"
              />
            )}
            <span className={""}>
              <small>Signed in as</small>
              <br />
              <strong>{session.user.email ?? session.user.name}</strong>
            </span>
            <button
              className="px-4 py-2 font-bold text-white rounded bg-slate-500 hover:bg-slate-700"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign out
            </button>
          </>
        )}
      </Layout>
    </div>
  );
};

Home.isPublic = true;
export default Home;
