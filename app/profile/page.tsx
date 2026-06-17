"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import PageHeader from "@/components/PageHeader";
import Input from "@/components/Input";
import Dropdowns from "@/components/CustomDropdown";
import { SVGLoader } from "@/components/SVGLoader";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import {
  useGetUserByIdQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation
} from "@/utils/APISlice/userApi";

const ProfileContent = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [activeTab, setActiveTab] = useState("info");

  // RTK Query endpoints
  const { data: userData, isLoading: isLoadingUser } = useGetUserByIdQuery(
    userId || "",
    { skip: !userId }
  );

  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] = useUpdatePasswordMutation();

  // Profile Form State
  const [profileInput, setProfileInput] = useState({
    name: "",
    phone: "",
    gender: "",
  });

  // Password Form State
  const [passwordInput, setPasswordInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Populate profile info from fetched API user details
  useEffect(() => {
    if (userData) {
      const user = userData.data?.user || userData.data?.data || userData.data || userData;
      setProfileInput({
        name: user?.name || user?.fullName || "",
        phone: user?.phone || "",
        gender: user?.gender || "",
      });
    } else if (session?.user) {
      setProfileInput({
        name: session.user.fullName || "",
        phone: session.user.phone || "",
        gender: "",
      });
    }
  }, [userData, session]);

  const handleProfileChange = (field: string, value: string) => {
    setProfileInput((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordInput((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileInput.name.trim()) {
      toast.error("Full name is required.");
      return;
    }
    try {
      const res = await updateProfile({
        name: profileInput.name,
        phone: profileInput.phone,
        gender: profileInput.gender,
      }).unwrap();
      toast.success(res?.message || "Profile updated successfully!");
    } catch (err: any) {
      toast.error(getErrorMessage(err, "Failed to update profile."));
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.oldPassword) {
      toast.error("Current password is required.");
      return;
    }
    if (!passwordInput.newPassword) {
      toast.error("New password is required.");
      return;
    }
    if (passwordInput.newPassword !== passwordInput.confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    try {
      const res = await updatePassword({
        oldPassword: passwordInput.oldPassword,
        newPassword: passwordInput.newPassword,
      }).unwrap();
      toast.success(res?.message || "Password updated successfully!");
      setPasswordInput({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      toast.error(getErrorMessage(err, "Failed to update password."));
    }
  };

  if (!userId && isLoadingUser) {
    return (
      <div className="flex justify-center items-center h-[300px] w-full">
        <SVGLoader width="40px" height="40px" color="#2563EB" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between gap-[20px] border border-[#fff] border-b-[#E5E7EB] pb-[20px]">
        <PageHeader text="Profile Settings" />
      </div>

      <div className="flex flex-col md:flex-row gap-[30px] mt-[24px]">
        {/* Navigation Sidebar Tabs */}
        <div className="w-full md:w-[25%] flex flex-col gap-[8px]">
          <button
            onClick={() => setActiveTab("info")}
            className={`w-full text-left px-[16px] py-[12px] text-[14px] leading-[150%] font-medium transition cursor-pointer rounded-none border ${activeTab === "info"
                ? "!bg-[#2563EB] text-white border-[#2563EB]"
                : "!bg-white text-[#3A4050] border-[#E5E7EB] hover:bg-gray-50"
              }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`w-full text-left px-[16px] py-[12px] text-[14px] leading-[150%] font-medium transition cursor-pointer rounded-none border ${activeTab === "password"
                ? "!bg-[#2563EB] text-white border-[#2563EB]"
                : "!bg-white text-[#3A4050] border-[#E5E7EB] hover:bg-gray-50"
              }`}
          >
            Security & Password
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="w-full md:w-[75%] bg-white border border-[#E5E7EB] p-[24px]">
          {activeTab === "info" ? (
            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-[20px]">
              <h2 className="text-[16px] font-semibold text-[#3A4050] border-b border-[#F2F4F7] pb-[10px] mb-[10px]">
                Update Profile Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                <Input
                  value={profileInput.name}
                  handleOnChange={(e) => handleProfileChange("name", e.target.value)}
                  label="Full Name"
                  placeholder="Enter full name"
                  type="text"
                />

                <Input
                  value={profileInput.phone}
                  handleOnChange={(e) => handleProfileChange("phone", e.target.value)}
                  label="Phone Number"
                  placeholder="Enter phone number"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] items-end">
                <div className="flex flex-col w-full">
                  <Dropdowns
                    label={profileInput.gender || "Select Gender"}
                    options={[
                      "Male",
                      "Female",
                      "Other",
                      "Prefer not to say"
                    ]}
                    name="gender"
                    handleOnChange={handleProfileChange}
                    islabelone="Gender"
                  />
                </div>

                <Input
                  value={session?.user?.email || ""}
                  handleOnChange={() => { }}
                  label="Email Address (Read Only)"
                  placeholder=""
                  type="text"
                  disabled
                />
              </div>

              <div className="flex justify-end mt-[10px]">
                <button
                  type="submit"
                  disabled={isUpdatingProfile}
                  className="px-6 py-[10px] !bg-[#2563EB] text-white font-medium text-[14px] hover:!bg-blue-700 transition cursor-pointer min-w-[150px] flex items-center justify-center rounded-none"
                >
                  {isUpdatingProfile ? (
                    <SVGLoader width="24px" height="24px" color="#FFF" />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleUpdatePassword} className="flex flex-col gap-[20px]">
              <h2 className="text-[16px] font-semibold text-[#3A4050] border-b border-[#F2F4F7] pb-[10px] mb-[10px]">
                Change Password
              </h2>

              <div className="flex flex-col w-full md:w-[60%] gap-[15px]">
                <Input
                  value={passwordInput.oldPassword}
                  handleOnChange={(e) => handlePasswordChange("oldPassword", e.target.value)}
                  label="Current Password"
                  placeholder="Enter current password"
                  type="password"
                />

                <Input
                  value={passwordInput.newPassword}
                  handleOnChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                  label="New Password"
                  placeholder="Enter new password"
                  type="password"
                />

                <Input
                  value={passwordInput.confirmPassword}
                  handleOnChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                  label="Confirm New Password"
                  placeholder="Confirm new password"
                  type="password"
                />
              </div>

              <div className="flex justify-end mt-[10px]">
                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="px-6 py-[10px] !bg-[#2563EB] text-white font-medium text-[14px] hover:!bg-blue-700 transition cursor-pointer min-w-[150px] flex items-center justify-center rounded-none"
                >
                  {isUpdatingPassword ? (
                    <SVGLoader width="24px" height="24px" color="#FFF" />
                  ) : (
                    "Update Password"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-[300px] w-full">
        <SVGLoader width="40px" height="40px" color="#2563EB" />
      </div>
    }>
      <ProfileContent />
    </Suspense>
  );
};

export default ProfilePage;
