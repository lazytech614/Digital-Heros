export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4 space-y-4">
        <h2 className="font-bold text-lg">Admin</h2>

        <nav className="flex flex-col gap-2 text-sm">
          <a href="/admin">Dashboard</a>
          <a href="/admin/draws">Draws</a>
          <a href="/admin/winners">Winners</a>
          <a href="/admin/charities">Charities</a>
          <a href="/admin/users">Users</a>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}