"use client";
import { useState, useEffect } from "react";
import Input from "../../components/Input";
import { SVGLoader } from "../../components/SVGLoader";
import { useAddOfficeLocationMutation } from "@/utils/APISlice/officeLocationApi";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "sonner";

interface OfficeLocationModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const OfficeLocationModal = ({ isOpen, setIsOpen }: OfficeLocationModalProps) => {
	const [addOfficeLocation, { isLoading: isLoadingUpdate, isSuccess: success }] = useAddOfficeLocationMutation();

	const [inputs, setInputs] = useState({
		name: "",
		address: "",
	});

	useEffect(() => {
		if (success) {
			setIsOpen(false);
			resetForm();
		}
	}, [success, setIsOpen]);

	const handleOnChange = (input: string, value: string) => {
		setInputs((prevState) => ({
			...prevState,
			[input]: value,
		}));
	};

	const resetForm = () => { setInputs({ name: "", address: "", }) };

	const handleSubmit = async () => {
		try {
			await addOfficeLocation({ name: inputs.name, address: inputs.address }).unwrap();
		} catch (error: any) {
			toast.error(error?.data?.message || "Failed to add office location");
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
								<h3 className="text-lg font-semibold">Create Office</h3>
								<button
									className="text-gray-500 hover:text-gray-800 rounded-none"
									onClick={() => {
										setIsOpen(false);
										resetForm();
									}}
								>
									<AiOutlineClose size={20} />
								</button>
							</div>

							{/* Body */}
							<div className="p-6 overflow-y-auto min-h-7 flex flex-col gap-4">
								<Input
									type="text"
									value={inputs.name}
									handleOnChange={(e) => handleOnChange("name", e.target.value)}
									label="Office Name"
									placeholder="Office Name"
								/>
								<Input
									type="text"
									value={inputs.address}
									handleOnChange={(e) => handleOnChange("address", e.target.value)}
									label="Address"
									placeholder="Address"
								/>
							</div>

							{/* Footer */}
							<div className="p-6 border-t flex justify-end bg-white rounded-b-[32px]">
								<button
									onClick={() => {
										setIsOpen(false);
										resetForm();
									}}
									className="btn_model_outline rounded-none"
								>
									Cancel
								</button>
								<button
									className="btn_model_active ml-3 rounded-none"
									onClick={handleSubmit}
								>
									{isLoadingUpdate ? (
										<SVGLoader width="30px" height="30px" color="#FFF" />
									) : (
										"Add Office"
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

export default OfficeLocationModal;
