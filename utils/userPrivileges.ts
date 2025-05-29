import { useSession } from "next-auth/react";

export function useUserPrivileges() {
  const { data: session } = useSession(); 

  const userType = session?.user?.role ?? null;
  const userToken = session?.user?.token ?? null;
  const user = session?.user ?? null;

  const isSuperAdmin = userType === "SuperAdmin";
  const isAdmin = userType === "admin";
  const isAgencyCreator = userType === "agency_creator";
  const isAgencyApprover = userType === "agency_approver";
  const isFinancialApprover = userType === "financial_approver";
  const isClient = userType === "client";
  const token = userToken  

  return {
    isSuperAdmin,
    isAdmin,
    isAgencyCreator,
    isAgencyApprover,
    isFinancialApprover,
    isClient,
    token,
    user
  };
}
