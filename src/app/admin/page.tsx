import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/isAdmin";

export default async function AdminPage() {
  const admin = await isAdmin();

  if (!admin) {
    redirect("/");
  }

  return (
    <div className="p-10 min-h-screen mt-16">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
    </div>
  );
}