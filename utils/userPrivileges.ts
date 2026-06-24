import { useSession } from "next-auth/react";

export function useUserPrivileges() {
  const { data: session } = useSession(); 

  const userType = session?.user?.role ?? null;
  const userToken = session?.user?.token ?? null;
  const user = session?.user ?? null;

  const isSuperAdmin = userType === "SuperAdmin";
  const isAdmin = userType === "admin"; 
  const token = userToken  

  return {
    isSuperAdmin,
    isAdmin, 
    token,
    user
  };
}
