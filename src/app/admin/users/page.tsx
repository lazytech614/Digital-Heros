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

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<string | null>(null);

  async function fetchUsers() {
    try {
      const query = new URLSearchParams();

      query.append("sort", filters.sort);

      if (filters.subscription)
        query.append("subscription", filters.subscription);

      if (filters.contribution)
        query.append("contribution", filters.contribution);

      filters.charities.forEach((c) =>
        query.append("charities", c)
      );

      const res = await fetch(`/api/users?${query.toString()}`);

      if (!res.ok) {
        console.error("API Error:", res.status);
        setUsers([]);
        return;
      }

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch failed:", err);
      setUsers([]);
    }
  }

  // 🔥 Debounce (important improvement)
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUsers();
    }, 400);

    return () => clearTimeout(timeout);
  }, [filters]);

  const confirmAction = (message: string) => {
    return window.confirm(message);
  };

  async function deleteUserHandler(id: string) {
    if (!confirmAction("Are you sure you want to delete this user?")) return;

    setLoadingId(id);
    setActionType("delete");

    await fetch(`/api/users/${id}`, { method: "DELETE" });

    setLoadingId(null);
    setActionType(null);
    fetchUsers();
  }

  async function cancelSubscriptionHandler(id: string) {
    if (!confirmAction("Cancel this user's subscription?")) return;

    setLoadingId(id);
    setActionType("subscription");

    await fetch(`/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ type: "cancel-subscription" }),
    });

    setLoadingId(null);
    setActionType(null);
    fetchUsers();
  }

  async function cancelCharityHandler(userId: string, charityId: string) {
    if (!confirmAction("Remove this charity from user?")) return;

    setLoadingId(userId + charityId);
    setActionType("charity");

    await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ type: "cancel-charity", charityId }),
    });

    setLoadingId(null);
    setActionType(null);
    fetchUsers();
  }

  return (
    <div className="p-6 bg-[#f8fafc] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* SORT */}
        <select
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, sort: e.target.value })
          }
        >
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>

        {/* ✅ SUBSCRIPTION DROPDOWN */}
        <select
          className="border p-2 rounded"
          value={filters.subscription}
          onChange={(e) =>
            setFilters({ ...filters, subscription: e.target.value })
          }
        >
          <option value="">All Subscriptions</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="CANCELLED">CANCELLED</option>
          <option value="EXPIRED">EXPIRED</option>
          <option value="PAST_DUE">PAST_DUE</option>
        </select>

        {/* ✅ CONTRIBUTION FILTER (>=) */}
        <input
          type="number"
          min="0"
          className="border p-2 rounded"
          placeholder="Min Contribution %"
          value={filters.contribution}
          onChange={(e) =>
            setFilters({ ...filters, contribution: e.target.value })
          }
        />
      </div>

      {/* USERS LIST */}
      <div className="grid md:grid-cols-2 gap-6">
        {users.map((user) => {
          const isDeleting =
            loadingId === user.id && actionType === "delete";
          const isCancellingSub =
            loadingId === user.id && actionType === "subscription";

          return (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-sm border p-5 space-y-3"
            >
              <div>
                <p className="font-semibold text-lg">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <p className="text-sm mt-1">
                  Subscription:{" "}
                  <span className="font-medium">
                    {user.subscriptionStatus || "None"}
                  </span>
                </p>
              </div>

              {/* Charities */}
              <div>
                <p className="font-medium text-sm mb-1">Charities:</p>

                {user.charities.length === 0 ? (
                  <p className="text-gray-400 text-sm">No charities</p>
                ) : (
                  <div className="space-y-1">
                    {user.charities.map((c: any) => {
                      const isRemoving =
                        loadingId === user.id + c.id &&
                        actionType === "charity";

                      return (
                        <div
                          key={c.id}
                          className="flex justify-between items-center text-sm"
                        >
                          <span>{c.name}</span>

                          <button
                            disabled={isRemoving}
                            onClick={() =>
                              cancelCharityHandler(user.id, c.id)
                            }
                            className="text-red-500 text-xs"
                          >
                            {isRemoving ? "Removing..." : "Remove"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button
                  disabled={isCancellingSub}
                  onClick={() => cancelSubscriptionHandler(user.id)}
                  className="bg-yellow-500 px-3 py-1 rounded text-sm"
                >
                  {isCancellingSub
                    ? "Cancelling..."
                    : "Cancel Subscription"}
                </button>

                <button
                  disabled={isDeleting}
                  onClick={() => deleteUserHandler(user.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}