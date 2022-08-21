import { signIn } from "next-auth/react";

export default function AccessDenied() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Access Denied</h1>
      <p>You are not authorized to access this page.</p>
      <button
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        onClick={(e) => {
          e.preventDefault();
          signIn("oidc");
        }}
      >
        Sign in
      </button>
    </div>
  );
}
