"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import Input from "../Input";
import { SVGLoader } from "../SVGLoader";
import { useGetOfficeLocationsQuery } from "@/utils/APISlice/officeLocationApi";
import { useUpdateUserMutation } from "@/utils/APISlice/userApi";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import Dropdowns from "../CustomDropdown";

interface EditEmployeeModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	user: any;
}

const EditEmployeeModal = ({ isOpen, setIsOpen, user }: EditEmployeeModalProps) => {
	const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
	const { data: officeData, isLoading: isLoadingOffices } = useGetOfficeLocationsQuery();

	const [inputs, setInputs] = useState({
		name: "",
		phone: "",
		gender: "",
		email: "",
		officeId: "",
		role: "",
		isActive: "active",
		logo: "",
	});

	const [logoPreview, setLogoPreview] = useState<string>("");

	// Prefill inputs when modal opens or user details change
	useEffect(() => {
		if (isOpen && user) {
			setInputs({
				name: user.fullName || user.name || "",
				phone: user.phone || "",
				gender: user.gender || "",
				email: user.email || "",
				officeId: user.officeId?._id || user.officeId || "",
				role: user.role || "",
				isActive: user.isActive || "active",
				logo: user.logo || "",
			});
			setLogoPreview(user.logo || "");
		}
	}, [isOpen, user]);

	// Extract and map office options to format required by CustomDropdown { id, name }
	const officeLocations = officeData?.data?.data || officeData?.data || officeData || [];
	const locationOptions = Array.isArray(officeLocations)
		? officeLocations.map((office: any) => ({
			id: office._id || office.id,
			name: office.name,
		}))
		: [];

	const handleOnChange = (name: string, value: string) => {
		setInputs((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Limit file size to 2MB to keep base64 payload size reasonable
			if (file.size > 2 * 1024 * 1024) {
				toast.error("File size is too large. Please select an image under 2MB.");
				return;
			}
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = reader.result as string;
				setLogoPreview(base64String);
				handleOnChange("logo", base64String);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async () => {
		if (!inputs.name.trim()) {
			toast.error("Full name is required.");
			return;
		}

		try {
			const userId = user?.id || user?._id;
			await updateUser({
				userId,
				body: {
					name: inputs.name,
					phone: inputs.phone,
					gender: inputs.gender,
					email: inputs.email,
					officeId: inputs.officeId || null,
					role: inputs.role,
					isActive: inputs.isActive,
					logo: inputs.logo || null,
				},
			}).unwrap();
			toast.success("Employee profile updated successfully!");
			setIsOpen(false);
		} catch (error: any) {
			toast.error(getErrorMessage(error, "Failed to update employee profile"));
		}
	};

	// Find the label of the currently selected office
	const selectedOfficeOption = locationOptions.find((opt) => opt.id === inputs.officeId);
	const officeLabel = selectedOfficeOption ? selectedOfficeOption.name : "Select Location";

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "auto";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isOpen]);

	return (
		<div className="z-50 h-full">
			{isOpen && (
				<>
					{/* Overlay */}
					<div
						className="fixed !inset-0 bg-[#00000051] !bg-opacity-50 z-40"
						onClick={() => setIsOpen(false)}
					></div>

					{/* Modal Content */}
					<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
						<div className="bg-white w-[700px] max-w-[95vw] max-h-[90vh] rounded-[5px] flex flex-col shadow-xl relative">
							{/* Header */}
							<div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10 bg-white rounded-t-[32px]">
								<h3 className="text-lg font-semibold">Edit Employee Profile</h3>
								<button
									className="text-gray-500 hover:text-gray-800 rounded-none cursor-pointer"
									onClick={() => setIsOpen(false)}
								>
									<AiOutlineClose size={20} />
								</button>
							</div>

							{/* Body */}
							<div className="p-6 overflow-y-auto min-h-7 flex flex-col gap-4">
								{/* Logo Uploader */}
								{/* <div className="flex flex-col gap-[6px]">
									<span className="font-medium text-[15px] leading-5 text-gray-600">Profile Logo / Image</span>
									<div className="flex items-center gap-4">
										{logoPreview ? (
											<div className="relative w-16 h-16 border border-gray-200 rounded-full overflow-hidden flex-shrink-0">
												<img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
											</div>
										) : (
											<div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 font-semibold text-xs flex-shrink-0">
												No Logo
											</div>
										)}
										<label className="cursor-pointer px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition font-medium">
											Choose Image
											<input
												type="file"
												className="hidden"
												accept="image/*"
												onChange={handleLogoChange}
											/>
										</label>
										{logoPreview && (
											<button
												onClick={() => {
													setLogoPreview("");
													handleOnChange("logo", "");
												}}
												className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
											>
												Remove
											</button>
										)}
									</div>
								</div> */}

								<Input
									value={inputs.name}
									handleOnChange={(e) => handleOnChange("name", e.target.value)}
									label="Full Name"
									placeholder="Full Name"
									type="text"
									required
								/>

								<Input
									value={inputs.phone}
									handleOnChange={(e) => handleOnChange("phone", e.target.value)}
									label="Mobile Number"
									placeholder="Mobile Number"
									type="text"
								/>

								<Input
									value={inputs.email}
									handleOnChange={(e) => handleOnChange("email", e.target.value)}
									label="Email Address"
									placeholder="Email Address"
									type="text"
								/>

								<Dropdowns
									label={inputs.role || "Select Role"}
									options={["ADMIN", "AGENT"]}
									name="role"
									handleOnChange={handleOnChange}
									islabelone="Role"
								/>

								<Dropdowns
									label={inputs.gender || "Select Gender"}
									options={["Male", "Female", "Other", "Prefer not to say"]}
									name="gender"
									handleOnChange={handleOnChange}
									islabelone="Gender"
								/>

								<Dropdowns
									label={officeLabel}
									options={locationOptions}
									name="officeId"
									handleOnChange={handleOnChange}
									islabelone="Office"
									loading={isLoadingOffices}
								/>

								<Dropdowns
									label={
										inputs.isActive === "active" 
											? "Active" 
											: inputs.isActive === "resigned" 
											? "Resigned" 
											: "Inactive"
									}
									options={["Active", "Inactive", "Resigned"]}
									name="isActive"
									handleOnChange={(name, value) => {
										let val = "active";
										if (value === "Inactive") val = "deactivated";
										else if (value === "Resigned") val = "resigned";
										handleOnChange("isActive", val);
									}}
									islabelone="Status"
								/>
							</div>

							{/* Footer */}
							<div className="p-6 border-t border-gray-100 flex justify-end bg-white rounded-b-[32px]">
								<button
									onClick={() => setIsOpen(false)}
									className="btn_model_outline rounded-none cursor-pointer"
								>
									Cancel
								</button>
								<button
									className="btn_model_active ml-3 rounded-none cursor-pointer"
									onClick={handleSubmit}
									disabled={isUpdating}
								>
									{isUpdating ? (
										<SVGLoader width="30px" height="30px" color="#FFF" />
									) : (
										"Save Changes"
									)}
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default EditEmployeeModal;
