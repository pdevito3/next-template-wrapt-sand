import Link from "next/link";

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  return (
    <header>
      <nav>
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
      </nav>
    </header>
  );
}
