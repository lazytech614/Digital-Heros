"use client";

import { useUser } from "@clerk/nextjs";

export function useAdmin() {
  const { user, isLoaded } = useUser();

  const isAdmin =
    isLoaded &&
    user?.primaryEmailAddress?.emailAddress ===
      process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  return { isAdmin, isLoaded };
}