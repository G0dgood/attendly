import { useSession } from "next-auth/react";

export function useUserPrivileges() {
  const { data: session } = useSession();
  console.log('session-session', session);

  const userType = session?.user?.role ?? null;

  const isSuperAdmin = userType === "SuperAdmin";
  const isAdmin = userType === "admin";
  const isAgencyCreator = userType === "agency_creator";
  const isAgencyApprover = userType === "agency_approver";
  const isFinancialApprover = userType === "financial_approver";
  const isClient = userType === "client";

  return {
    isSuperAdmin,
    isAdmin,
    isAgencyCreator,
    isAgencyApprover,
    isFinancialApprover,
    isClient,
  };
}
