import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useUserPrivileges() {
  const { data: session, status } = useSession(); 
  const [cachedUser, setCachedUser] = useState<any>(null);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("attendly_user");
      if (stored) {
        try {
          setCachedUser(JSON.parse(stored));
        } catch (e) {
          console.error("Error reading cached user:", e);
        }
      }
    }
  }, []);

  // Update localStorage when session changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (session?.user) {
        localStorage.setItem("attendly_user", JSON.stringify(session.user));
        setCachedUser(session.user);
      } else if (status === "unauthenticated") {
        if (window.location.pathname === "/") {
          localStorage.removeItem("attendly_user");
          localStorage.removeItem("attendly_user_profile");
          setCachedUser(null);
        }
      }
    }
  }, [session, status]);

  const activeUser = session?.user || cachedUser;
  const userType = activeUser?.role ?? null;
  const userToken = activeUser?.token ?? null;
  const user = activeUser ?? null;

  const isSuperAdmin = userType === "SUPER_ADMIN";
  const isAdmin = userType?.toUpperCase() === "ADMIN"; 
  const isAgent = userType?.toUpperCase() === "AGENT";
  const token = userToken;

  return {
    isSuperAdmin,
    isAdmin, 
    isAgent,
    token,
    user
  };
}
