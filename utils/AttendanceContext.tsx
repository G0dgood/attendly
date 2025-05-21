"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUserPrivileges } from "./userPrivileges";

interface AttendanceContextType {
	attendanceRecords: any[];
	isLoading: boolean;
	fetchAttendance: () => Promise<void>;
	addAttendance: (employeeId: any, date: any, status: any) => Promise<void>;
	updateAttendance: (recordId: any, newStatus: any) => Promise<void>;
	selectedEmployeeId: any;
	setSelectedEmployeeId: React.Dispatch<React.SetStateAction<any>>;
	error: unknown;
	setError: React.Dispatch<React.SetStateAction<unknown>>;
	success: boolean | null;
	setSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	dateFilter: any;
	setDateFilter: React.Dispatch<React.SetStateAction<any>>;
}

const AttendanceContext = createContext<AttendanceContextType | null>(null);

export const useAttendance = () => useContext(AttendanceContext);

export const AttendanceProvider = ({ children }: { children: React.ReactNode }) => {
	const { token } = useUserPrivileges();
	const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
	const [error, setError] = useState<unknown>(null);
	const [success, setSuccess] = useState<boolean | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [dateFilter, setDateFilter] = useState(null);



	const fetchAttendance = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/attendance`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setAttendanceRecords(res.data?.data || []);
			setSuccess(true);
		} catch (err) {
			setError(err as unknown);
		} finally {
			setIsLoading(false);
		}
	};

	const addAttendance = async (employeeId: any, date: any, status: any) => {
		setIsLoading(true);
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_STRAPI_URL}/attendance`,
				{
					data: {
						employee: employeeId,
						date,
						status,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
					},
				}
			);
			setAttendanceRecords((prev) => [...prev, res.data.data]);
			setSuccess(true);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	const updateAttendance = async (recordId: any, newStatus: any) => {
		setIsLoading(true);
		try {
			await axios.put(
				`${process.env.NEXT_PUBLIC_STRAPI_URL}/attendance/${recordId}`,
				{
					data: { status: newStatus },
				},
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
					},
				}
			);
			setAttendanceRecords((prev) =>
				prev.map((rec) => (rec.id === recordId ? { ...rec, status: newStatus } : rec))
			);
			setSuccess(true);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AttendanceContext.Provider
			value={{
				attendanceRecords,
				isLoading,
				fetchAttendance,
				addAttendance,
				updateAttendance,
				selectedEmployeeId,
				setSelectedEmployeeId,
				error,
				setError,
				success,
				setSuccess,
				modalOpen,
				setModalOpen,
				dateFilter,
				setDateFilter,
			}}
		>
			{children}
		</AttendanceContext.Provider>
	);
};
// Removed duplicate declaration of useAttendance
