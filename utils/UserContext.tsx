"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUserPrivileges } from "./userPrivileges";

interface UserContextType {
	users: any[];
	successQR: any;
	dataQR: any;
	isLoading: boolean;
	fetchUsers: () => Promise<void>;
	qrToken: any;
	addUser: (userData: any) => Promise<void>;
	updateUser: (userId: any, updatedData: any) => Promise<void>;
	selectedUserId: any;
	setSelectedUserId: React.Dispatch<React.SetStateAction<any>>;
	error: unknown;
	setError: React.Dispatch<React.SetStateAction<unknown>>;
	success: boolean;
	createSuccess: boolean;
	isLoadingCreate: boolean;
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setCreateSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setIsLoadingCreate: React.Dispatch<React.SetStateAction<boolean>>;
	setSuccessQR: React.Dispatch<React.SetStateAction<boolean>>;
	setDataQR: any;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const { token } = useUserPrivileges();
	const [users, setUsers] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingCreate, setIsLoadingCreate] = useState(false);
	const [isLoadingQR, setIsLoadingQR] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState(null);
	const [error, setError] = useState<unknown>(null);
	const [success, setSuccess] = useState<boolean>(false);
	const [successQR, setSuccessQR] = useState<any>(false);
	const [dataQR, setDataQR] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [createSuccess, setCreateSuccess] = useState<boolean>(false);

	const fetchUsers = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setUsers(res.data?.data || []);
			setIsLoading(false);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	const addUser = async (input: any) => {
		setIsLoadingCreate(true);
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/users/register`,
				input,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setIsLoadingCreate(false)
			setSuccess(true);
		} catch (err: any) {
			const errors =
				err.response?.data?.errors?.[0]?.message ?? err.message;
			setError(errors);
		} finally {
			setIsLoadingCreate(false);
		}
	};

	const updateUser = async (userId: any, updatedData: any) => {
		setIsLoadingCreate(true);
		try {
			await axios.patch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`,
				{
					data: updatedData,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setIsLoadingCreate(false)
			setUsers((prev) =>
				prev.map((user) => (user.id === userId ? { ...user, ...updatedData } : user))
			);
			setSuccess(true);
		} catch (err: any) {
			const errors =
				err.response?.data?.errors?.[0]?.message ?? err.message;

			setError(errors);
		} finally {
			setIsLoading(false);
		}
	};


	const qrToken = async (input: any) => {
		setIsLoadingQR(true);
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/qr-token`,
				input,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const qrData = res.data.data;

			// Save to localStorage
			// localStorage.setItem("qrTokenData", JSON.stringify(qrData));
			setDataQR(qrData)
			setSuccessQR(true);
		} catch (err: any) {
			const errors = err.response?.data?.errors?.[0]?.message ?? err.message;
			setError(errors);
		} finally {
			setIsLoadingQR(false);
		}
	};


	return (
		<UserContext.Provider
			value={{
				dataQR,
				qrToken,
				successQR,
				setDataQR,
				users,
				isLoading,
				fetchUsers,
				addUser,
				updateUser,
				selectedUserId,
				setSelectedUserId,
				error,
				setError,
				success,
				setSuccess,
				modalOpen,
				setModalOpen,
				searchQuery,
				setSearchQuery,
				setCreateSuccess,
				createSuccess,
				isLoadingCreate,
				setIsLoadingCreate,
				setSuccessQR
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
