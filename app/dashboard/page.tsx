// File: app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container p-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
      <p className="mb-4">Welcome back, {session.user.name}!</p>
      <div className="p-4 bg-gray-100 rounded-lg">
        <h2 className="mb-2 text-xl font-semibold">Your Account Info</h2>
        <p>
          <strong>Email:</strong> {session.user.email}
        </p>
        <p>
          <strong>User ID:</strong> {session.user.id}
        </p>
      </div>
    </div>
  );
}
