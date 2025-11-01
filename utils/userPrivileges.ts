import { useSelector } from "react-redux";

export function useUserPrivileges() {
  const { user, token } = useSelector((state: any) => state.auth); 

  const userType = user?.role ?? null;
  const userToken = token ?? null;

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
    token: userToken,
    user
  };
}
