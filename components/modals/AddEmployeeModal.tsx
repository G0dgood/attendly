"use client";
import { useState, useEffect } from "react";
import Input from "../Input";
import { SVGLoader } from "../SVGLoader";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "sonner";
import DropdownsOffice from "../CustomDropdown";
import Dropdowns from "../CustomDropdown";
import { useAddUserMutation } from "@/utils/APISlice/api";
import { useGetOfficeLocationsQuery } from "@/utils/APISlice/api";

interface AddEmployeeModalModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const AddEmployeeModalModal = ({ isOpen, setIsOpen }: AddEmployeeModalModalProps) => {
	const [addUser, { isLoading: isLoadingCreate, error }] = useAddUserMutation();
	const { data: officeLocationsData, isLoading: newisLoading } = useGetOfficeLocationsQuery();

	const [input, setInputs] = useState({
		name: "",
		email: "",
		password: "123456",
		phone: "",
		role: "",
		gender: "",
		officeId: ""
	});

	// Merge API data with mock "soner"
	const locationOptions = [
		...(officeLocationsData?.data || officeLocationsData || [])
	];







	const handleOnChange = (name: string, value: string) => {
		setInputs((prev) => ({ ...prev, [name]: value }));
	};

	// const resetForm = () => { setInputs({ firstName: "", address: "", }) };

	const handleSubmit = async () => {
		// Validate form before submission
		// if (!validateForm()) {
		// 	return;
		// }
		try {
			await addUser(input).unwrap();
			toast.success("Employee Created!");
			setIsOpen(false);
			// Reset form if needed
		} catch (error: any) {
			const errorMsg = error?.data?.message || "Failed to create employee";
			toast.error(errorMsg);
		}
	}

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
					<div className="fixed !inset-0 bg-[#00000051] !bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>

					{/* Modal Content */}
					<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
						<div className="bg-white w-[700px] max-w-[95vw] max-h-[90vh] rounded-[5px] flex flex-col shadow-xl relative">
							{/* Header */}
							<div className="p-6   border-b flex justify-between items-center sticky top-0 z-10 bg-white rounded-t-[32px]">
								<h3 className="text-lg font-semibold">Register </h3>
								<button
									className="text-gray-500 hover:text-gray-800 rounded-none"
									onClick={() => {
										setIsOpen(false);
										// resetForm();
									}}
								>
									<AiOutlineClose size={20} />
								</button>
							</div>

							{/* Body */}
							<div className="p-6 overflow-y-auto min-h-7 flex flex-col gap-4">
								< Input value={input.name}
									handleOnChange={(e) => handleOnChange("name", e.target.value)}
									label={'Full Name'} placeholder={'Full Name'} type={''} />


								< Input value={input.phone}
									handleOnChange={(e) => handleOnChange("phone", e.target.value)}
									label={'Mobile Number'} placeholder={'Mobile Number'} type={''} />


								< Input value={input.email}
									handleOnChange={(e) => handleOnChange("email", e.target.value)}
									label={'Email Address'} placeholder={'Email Address'} type={''}
								/>



								<Dropdowns
									label={'Role'}
									right={''}
									loading={newisLoading}
									options={[
										"ADMIN",
										"AGENT",
									]}
									name={'role'}
									handleOnChange={handleOnChange}
									islabelone="Role"
								/>


								<Dropdowns
									label={'Gender'}
									right={''}
									options={[
										"Male",
										"Female",
										"Other",
										"Prefer not to say"
									]} name={'gender'}
									handleOnChange={handleOnChange}
									islabelone="Gender"
								/>




								<DropdownsOffice
									label="Select Location"
									options={locationOptions}
									name="officeId"
									handleOnChange={handleOnChange}
									islabelone="Office"
								/>

								< Input value={input.password}
									handleOnChange={(e) => handleOnChange("password", e.target.value)}
									label={'Password'} placeholder={'Password'} type={""} />

							</div>





							{/* Footer */}
							<div className="p-6 border-t flex justify-end bg-white rounded-b-[32px]">
								<button
									onClick={() => {
										setIsOpen(false);
									}}
									className="btn_model_outline rounded-none"
								>
									Cancel
								</button>
								<button
									className="btn_model_active ml-3 rounded-none"
									onClick={handleSubmit}
								>
									{isLoadingCreate ? (
										<SVGLoader width="30px" height="30px" color="#FFF" />
									) : (
										"Create Employee"
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

export default AddEmployeeModalModal;


