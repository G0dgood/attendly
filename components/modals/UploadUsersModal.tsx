"use client";
import React, { useState, useEffect, useRef } from "react";
import { useGetOfficeLocationsQuery } from "@/utils/APISlice/officeLocationApi";
import { useUploadUsersMutation } from "@/utils/APISlice/userApi";
import DropdownsOffice from "../CustomDropdown";
import { SVGLoader } from "../SVGLoader";
import { AiOutlineClose } from "react-icons/ai";
import { FiUploadCloud, FiFileText } from "react-icons/fi";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";

interface UploadUsersModalProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const UploadUsersModal = ({ isOpen, setIsOpen }: UploadUsersModalProps) => {
	const [uploadUsers, { isLoading: isLoadingUpload, isSuccess: success, error, data, reset: resetMutation }] = useUploadUsersMutation();
	const { data: officeData, isLoading: isLoadingOffices } = useGetOfficeLocationsQuery();

	const [officeId, setOfficeId] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [isDragActive, setIsDragActive] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Merge API data
	const officeLocations = officeData?.data?.data || officeData?.data || officeData || [];
	const locationOptions = Array.isArray(officeLocations) ? [...officeLocations] : [];

	const failedRows = data?.data?.failed || [];
	const skippedRows = data?.data?.skipped || [];
	const combinedResults = [
		...failedRows.map((item: any) => ({ ...item, type: "Failed" })),
		...skippedRows.map((item: any) => ({ ...item, type: "Skipped" }))
	].sort((a, b) => (a.row || 0) - (b.row || 0));

	const resetForm = () => {
		setOfficeId("");
		setFile(null);
		setIsDragActive(false);
		resetMutation();
	};

	useEffect(() => {
		if (!isOpen) {
			resetForm();
		}
	}, [isOpen]);

	useEffect(() => {
		if (success) {
			const failedCount = data?.data?.failed?.length || 0;
			const skippedCount = data?.data?.skipped?.length || 0;
			const createdCount = data?.data?.created || 0;
			if (failedCount === 0 && skippedCount === 0) {
				toast.success(`Bulk Upload Successful! ${createdCount} user(s) created.`);
				setIsOpen(false);
				resetForm();
			} else {
				if (createdCount > 0) {
					toast.error(`Upload complete: ${createdCount} created, ${failedCount} failed, ${skippedCount} skipped.`);
				} else {
					toast.error(`Upload complete with entries skipped/failed: 0 created, ${failedCount} failed, ${skippedCount} skipped.`);
				}
			}
		}
	}, [success, data, setIsOpen]);

	useEffect(() => {
		if (error) {
			toast.error(getErrorMessage(error, "Failed to upload users"));
		}
	}, [error]);

	const handleOnChange = (name: string, value: string) => {
		if (name === "officeId") {
			setOfficeId(value);
		}
	};

	// Handle drag & drop events
	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === "dragenter" || e.type === "dragover") {
			setIsDragActive(true);
		} else if (e.type === "dragleave") {
			setIsDragActive(false);
		}
	};

	const validateFile = (selectedFile: File) => {
		const allowedExtensions = [".csv", ".xlsx", ".xls"];
		const fileName = selectedFile.name.toLowerCase();
		const isValid = allowedExtensions.some(ext => fileName.endsWith(ext));

		if (!isValid) {
			toast.error("Invalid file format. Please upload a CSV or Excel (.xlsx/.xls) file.");
			return false;
		}
		return true;
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragActive(false);

		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			const droppedFile = e.dataTransfer.files[0];
			if (validateFile(droppedFile)) {
				setFile(droppedFile);
			}
		}
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const selectedFile = e.target.files[0];
			if (validateFile(selectedFile)) {
				setFile(selectedFile);
			}
		}
	};

	const onButtonClick = () => {
		fileInputRef.current?.click();
	};

	const handleUpload = () => {
		if (!officeId) {
			toast.error("Please select an office location first.");
			return;
		}
		if (!file) {
			toast.error("Please choose or drop a file to upload.");
			return;
		}

		uploadUsers({ officeId, file });
	};

	const downloadSampleTemplate = () => {
		const headers = "name,email,password,phone,role,gender\n";
		const sampleData = "Jane Doe,jane.doe@example.com,12345678,08012345678,AGENT,Female\n";
		const csvContent = headers + sampleData;
		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "attendance-tracker-base-template.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		toast.success("Sample template downloaded!");
	};

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
						<div className="bg-white w-[600px] max-w-[95vw] max-h-[90vh] rounded-[5px] flex flex-col shadow-xl relative">
							{/* Header */}
							<div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10 bg-white rounded-t-[32px]">
								<h3 className="text-lg font-semibold text-[#141414]">Bulk Upload Employees</h3>
								<button
									className="text-gray-500 hover:text-gray-800 rounded-none transition"
									onClick={() => {
										setIsOpen(false);
										resetForm();
									}}
								>
									<AiOutlineClose size={20} />
								</button>
							</div>

							{/* Body */}
							<div className="p-6 overflow-y-auto flex flex-col gap-5">
								{combinedResults.length > 0 ? (
									<div className="flex flex-col gap-4">
										<div className={`p-4 rounded-lg border ${data.data.created > 0
											? "bg-amber-50 border-amber-200 text-amber-800"
											: "bg-red-50 border-red-200 text-red-800"
											}`}>
											<h4 className="font-semibold text-sm">
												{data.data.created > 0
													? `Partial Upload Result: ${data.data.created} created, ${failedRows.length} failed, ${skippedRows.length} skipped`
													: `Upload Result: 0 created, ${failedRows.length} failed, ${skippedRows.length} skipped`
												}
											</h4>
											<p className="text-xs mt-1">
												Please review the details below, update your file, and try again.
											</p>
										</div>

										<div className="border border-gray-200 rounded-lg overflow-hidden max-h-[300px] overflow-y-auto">
											<table className="w-full text-left text-xs border-collapse">
												<thead className="bg-gray-100 text-gray-700 sticky top-0">
													<tr>
														<th className="p-2 border-b border-gray-200 font-semibold w-16">Row</th>
														<th className="p-2 border-b border-gray-200 font-semibold w-48">Email</th>
														<th className="p-2 border-b border-gray-200 font-semibold w-24">Status</th>
														<th className="p-2 border-b border-gray-200 font-semibold">Reason</th>
													</tr>
												</thead>
												<tbody className="divide-y divide-gray-200 bg-white">
													{combinedResults.map((item: any, idx: number) => (
														<tr key={idx} className="hover:bg-gray-50">
															<td className="p-2 text-gray-500 font-medium">{item.row}</td>
															<td className="p-2 text-gray-800 font-medium truncate max-w-[180px]">{item.email || "—"}</td>
															<td className="p-2 font-medium">
																<span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
																	item.type === "Failed" 
																		? "bg-red-100 text-red-800" 
																		: "bg-amber-100 text-amber-800"
																}`}>
																	{item.type}
																</span>
															</td>
															<td className={`p-2 font-normal ${
																item.type === "Failed" ? "text-red-600" : "text-amber-700"
															}`}>{item.reason || "—"}</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								) : (
									<>
										{/* Office Dropdown */}
										<div className="w-full">
											<DropdownsOffice
												label="Select Office Location"
												options={locationOptions}
												name="officeId"
												handleOnChange={handleOnChange}
												islabelone="Office Location"
											/>
										</div>

										{/* Drop Zone */}
										<div
											className={`w-full h-[200px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 transition duration-300 relative ${isDragActive
												? "border-[#2563EB] bg-[#EFF6FF]"
												: "border-[#E5E7EB] hover:border-gray-400 bg-gray-50"
												}`}
											onDragEnter={handleDrag}
											onDragLeave={handleDrag}
											onDragOver={handleDrag}
											onDrop={handleDrop}
										>
											<input
												ref={fileInputRef}
												type="file"
												className="hidden"
												accept=".csv,.xlsx,.xls"
												onChange={handleFileSelect}
											/>

											{!file ? (
												<div className="flex flex-col items-center justify-center text-center gap-2">
													<FiUploadCloud className="text-[40px] text-[#2563EB] mb-2 animate-bounce" />
													<p className="text-sm font-medium text-gray-700">
														Drag & drop your file here, or{" "}
														<span
															onClick={onButtonClick}
															className="text-[#2563EB] cursor-pointer hover:underline"
														>
															browse
														</span>
													</p>
													<p className="text-xs text-gray-500">Supports CSV, XLSX, and XLS formats</p>
												</div>
											) : (
												<div className="flex flex-col items-center justify-center text-center gap-2">
													<FiFileText className="text-[48px] text-green-500" />
													<p className="text-sm font-semibold text-gray-800 max-w-[400px] truncate">
														{file.name}
													</p>
													<p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
													<button
														onClick={() => setFile(null)}
														className="mt-2 text-xs font-semibold text-red-500 hover:text-red-700 hover:underline cursor-pointer"
													>
														Change File
													</button>
												</div>
											)}
										</div>

										{/* Download Template Button */}
										<div className="flex justify-between items-center bg-blue-50 p-4 border border-blue-100 rounded-lg">
											<div className="flex flex-col">
												<span className="text-xs font-semibold text-blue-800">Need a sample file template?</span>
												<span className="text-[11px] text-blue-600">Download the recommended structure to ensure proper upload formatting.</span>
											</div>
											<button
												onClick={downloadSampleTemplate}
												className="text-xs bg-white text-blue-600 border border-blue-200 px-3 py-1.5 hover:bg-blue-100 hover:text-blue-800 transition cursor-pointer font-medium"
											>
												Download CSV
											</button>
										</div>
									</>
								)}
							</div>

							{/* Footer */}
							<div className="p-6 border-t border-gray-100 flex justify-end bg-white rounded-b-[32px]">
								{combinedResults.length > 0 ? (
									<>
										<button
											onClick={resetForm}
											className="btn_model_outline rounded-none w-fit"
										>
											Upload Another File
										</button>
										<button
											onClick={() => {
												setIsOpen(false);
												resetForm();
											}}
											className="btn_model_active ml-3 rounded-none flex items-center justify-center gap-2"
										>
											Close
										</button>
									</>
								) : (
									<>
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
											className={`btn_model_active ml-3 rounded-none flex items-center justify-center gap-2 ${!officeId || !file ? "opacity-60 cursor-not-allowed" : ""
												}`}
											onClick={handleUpload}
											disabled={!officeId || !file || isLoadingUpload}
										>
											{isLoadingUpload ? (
												<SVGLoader width="20px" height="20px" color="#FFF" />
											) : (
												"Upload File"
											)}
										</button>
									</>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default UploadUsersModal;
