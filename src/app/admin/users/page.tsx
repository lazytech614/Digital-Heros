"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    sort: "desc",
    subscription: "",
    contribution: "",
    charities: [] as string[],
  });

  async function fetchUsers() {
    const query = new URLSearchParams();

    query.append("sort", filters.sort);
    if (filters.subscription) query.append("subscription", filters.subscription);
    if (filters.contribution) query.append("contribution", filters.contribution);

    filters.charities.forEach((c) => query.append("charities", c));

    const res = await fetch(`/api/users?${query.toString()}`);
    const data = await res.json();
    setUsers(data);
  }

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  async function deleteUserHandler(id: string) {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  }

  async function cancelSubscriptionHandler(id: string) {
    await fetch(`/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ type: "cancel-subscription" }),
    });
    fetchUsers();
  }

  async function cancelCharityHandler(userId: string, charityId: string) {
    await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ type: "cancel-charity", charityId }),
    });
    fetchUsers();
  }

 return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* FILTERS */}
      <div className="flex gap-4 mb-4">
        <select onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>

        <input
          placeholder="Subscription"
          onChange={(e) => setFilters({ ...filters, subscription: e.target.value })}
        />

        <input
          placeholder="Contribution %"
          onChange={(e) => setFilters({ ...filters, contribution: e.target.value })}
        />
      </div>

      {/* USERS LIST */}
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded">
            <p className="font-semibold">{user.name}</p>
            <p>{user.email}</p>
            <p>Subscription: {user.subscription || "None"}</p>

            <div className="mt-2">
              <p className="font-medium">Charities:</p>
              {user.charities.map((c: any) => (
                <div key={c.id} className="flex justify-between">
                  <span>{c.name}</span>
                  <button
                    onClick={() => cancelCharityHandler(user.id, c.id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => cancelSubscriptionHandler(user.id)}
                className="bg-yellow-500 px-3 py-1 rounded"
              >
                Cancel Subscription
              </button>

              <button
                onClick={() => deleteUserHandler(user.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
