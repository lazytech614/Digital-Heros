export async function fetchAdminData() {
  const res = await fetch("/api/admin");
  if (!res.ok) throw new Error("Failed to fetch admin data");
  return res.json();
}