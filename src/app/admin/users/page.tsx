import { prisma } from "@/lib/prisma";

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Users</h1>

      {users.map((u) => (
        <div key={u.id} className="p-3 border rounded mb-2">
          {u.email}
        </div>
      ))}
    </div>
  );
}