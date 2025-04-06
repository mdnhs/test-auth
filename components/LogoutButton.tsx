"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Sign out without immediate redirect
    router.push("/login"); // Redirect to sign-in page after logout
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}