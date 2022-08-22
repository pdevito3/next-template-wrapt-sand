import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import useAuthUser from "./auth/hooks/useAuthUser";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { session } = useAuthUser();
  return (
    <header>
      <nav className="flex items-center justify-between w-full px-6 space-x-12">
        <div className="">
          <ul className="flex my-6 space-x-4 bg-gray-200">
            <li className="font-bold">
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li className="font-bold">
              <Link href="/protected">
                <a>Protected</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
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
        </div>
      </nav>
    </header>
  );
}
