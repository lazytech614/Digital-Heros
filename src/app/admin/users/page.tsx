"use client";

import ConfirmationDialog from "@/components/global/confirmation-dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    sort: "desc",
    subscription: "",
    contribution: "",
    charities: [] as string[],
    name: "",
  });

  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<string | null>(null);

async function fetchUsers() {
  try {
    const query = new URLSearchParams();

    query.append("sort", filters.sort);

    if (filters.subscription) {
      query.append("subscription", filters.subscription);
    }

    if (filters.contribution) {
      query.append("contribution", filters.contribution);
    }

    filters.charities.forEach((c) => query.append("charities", c));

    if (filters.name.trim()) {
      query.append("name", filters.name.trim());
    }

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchUsers();
    }, 400);

    return () => clearTimeout(timeout);
  }, [filters]);

  async function deleteUserHandler(id: string) {
    setLoadingId(id);
    setActionType("delete");

    await fetch(`/api/users/${id}`, { method: "DELETE" });

    toast.success("User deleted!");
    setLoadingId(null);
    setActionType(null);
    fetchUsers();
  }

  async function cancelSubscriptionHandler(id: string) {
    setLoadingId(id);
    setActionType("subscription");

    await fetch(`/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ type: "cancel-subscription" }),
    });

    toast.success("Subscription cancelled!");
    setLoadingId(null);
    setActionType(null);
    fetchUsers();
  }

  async function cancelCharityHandler(userId: string, charityId: string) {
    setLoadingId(userId + charityId);
    setActionType("charity");

    await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify({ type: "cancel-charity", charityId }),
    });

    toast.success("Charity removed!");
    setLoadingId(null);
    setActionType(null);
    fetchUsers();
  }

  return (
    <div className="container mx-auto mt-16 p-6 bg-[#f8fafc] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Users</h1>

      {/* FILTERS */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          className="border p-2 rounded"
          placeholder="Search by name"
          value={filters.name}
          onChange={(e) =>
            setFilters({ ...filters, name: e.target.value })
          }
        />
        
        <select
          className="border p-2 rounded"
          onChange={(e) =>
            setFilters({ ...filters, sort: e.target.value })
          }
        >
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>

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

      <div className="grid md:grid-cols-2 gap-6">
        {users.map((user) => {
          const isDeleting =
            loadingId === user.id && actionType === "delete";
          const isCancellingSub =
            loadingId === user.id && actionType === "subscription";

          return (
            <div
              key={user.id}
              className="bg-white rounded-2xl shadow-sm border p-5 space-y-3 flex flex-col justify-between items-start"
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
                <p>Contribution: {user.contributionPct}%</p>
              </div>

              {/* Charities */}
              <div className="w-full">
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

                          <ConfirmationDialog
                            title="Remove Charity"
                            description="Are you sure you want to remove this charity from this user? This cannot be undone!"
                            onConfirm={() =>
                              cancelCharityHandler(user.id, c.id)
                            }
                          >
                            <button
                              disabled={isRemoving}
                              className="text-red-500 text-xs cursor-pointer"
                            >
                              {isRemoving ? "Removing..." : "Remove"}
                            </button>
                          </ConfirmationDialog>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <ConfirmationDialog
                  title="Cancel Subscription"
                  description="Are you sure you want to cancel this subscription? This cannot be undone!"
                  onConfirm={() => cancelSubscriptionHandler(user.id)}
                >
                  {user.subscriptionStatus === "ACTIVE" && (
                    <button
                    disabled={isCancellingSub}
                    className="bg-yellow-500 px-3 py-1 rounded text-sm cursor-pointer"
                  >
                    {isCancellingSub
                      ? "Cancelling..."
                      : "Cancel Subscription"}
                  </button>
                  )}
                </ConfirmationDialog>

                <ConfirmationDialog
                  title="Delete User"
                  description="Are you sure you want to delete this user? This cannot be undone!"
                  onConfirm={() => deleteUserHandler(user.id)}
                >
                  <button
                  disabled={isDeleting}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm cursor-pointer"
                >
                  {isDeleting ? "Deleting..." : "Delete User"}
                </button>
                </ConfirmationDialog>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}