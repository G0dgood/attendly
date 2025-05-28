"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUserPrivileges } from "./userPrivileges";
import { buildDynamicURL } from "@/shared/baseUrl";

interface AttendanceContextType {
	attendanceRecords: any[];
	isLoading: boolean;
	fetchAttendance: () => Promise<void>;
	getCalender: any
	addAttendance: (employeeId: any, date: any, status: any) => Promise<void>;
	addAttendanceManual: (input: any) => Promise<void>;
	updateAttendance: (recordId: any, newStatus: any) => Promise<void>;
	selectedEmployeeId: any;
	setSelectedEmployeeId: React.Dispatch<React.SetStateAction<any>>;
	setErrorAttendance: React.Dispatch<React.SetStateAction<any>>;
	setSuccessAttendance: React.Dispatch<React.SetStateAction<any>>;
	error: unknown;
	errorAttendance: unknown;
	isLoadingAttendance: unknown;
	setError: React.Dispatch<React.SetStateAction<unknown>>;
	success: boolean | null;
	successAttendance: boolean | null;
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
	const [isLoadingAttendance, setIsLoadingAttendance] = useState(false);
	const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
	const [error, setError] = useState<unknown>(null);
	const [errorAttendance, setErrorAttendance] = useState<unknown>(null);
	const [success, setSuccess] = useState<boolean | null>(null);
	const [successAttendance, setSuccessAttendance] = useState<boolean | null>(null);
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
			setIsLoading(true);
		} catch (err) {
			setError(err as unknown);
		} finally {
			setIsLoading(false);
		}
	};

	const getCalender = async (params: any) => {
		console.log('(params) ', params)
		const url = buildDynamicURL(`${process.env.NEXT_PUBLIC_BASE_URL}/attendance`, {
			page: params.page,
			limit: params.limit,
			filterByDate: params.filterByDate,
			startDate: params.startDate,
			endDate: params.endDate,
		});

		const { data } = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		// return data;
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
			setSuccess(true);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	const addAttendanceManual = async (input: any) => {
		setIsLoadingAttendance(true);
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/attendance/manual`, input,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setSuccessAttendance(true);
			setIsLoadingAttendance(false);
		} catch (err: any) {
			const errors =
				err.response?.data?.errors?.[0]?.message ?? err.message;
			setErrorAttendance(errors);
		} finally {
			setIsLoadingAttendance(false);
		}
	};

	const updateAttendance = async (recordId: any, newStatus: any) => {
		setIsLoading(true);
		try {
			await axios.put(
				`${process.env.NEXT_PUBLIC_STRAPI_URL}/attendance/${recordId}`,
				{ status: newStatus },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
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
				getCalender,
				successAttendance,
				errorAttendance,
				isLoadingAttendance,
				addAttendanceManual,
				setErrorAttendance,
				setSuccessAttendance
			}}
		>
			{children}
		</AttendanceContext.Provider>
	);
};
// Removed duplicate declaration of useAttendance
