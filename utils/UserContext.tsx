"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUserPrivileges } from "./userPrivileges";

interface UserContextType {
	users: any[];
	isLoading: boolean;
	fetchUsers: () => Promise<void>;
	addUser: (userData: any) => Promise<void>;
	updateUser: (userId: any, updatedData: any) => Promise<void>;
	selectedUserId: any;
	setSelectedUserId: React.Dispatch<React.SetStateAction<any>>;
	error: unknown;
	setError: React.Dispatch<React.SetStateAction<unknown>>;
	success: boolean | null;
	setSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const { token } = useUserPrivileges();
	const [users, setUsers] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState(null);
	const [error, setError] = useState<unknown>(null);
	const [success, setSuccess] = useState<boolean | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const fetchUsers = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setUsers(res.data?.data || []);
			setSuccess(true);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	const addUser = async (userData: any) => {
		setIsLoading(true);
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_STRAPI_URL}/users`,
				{
					data: userData,
				},
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
					},
				}
			);
			setUsers((prev) => [...prev, res.data.data]);
			setSuccess(true);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	const updateUser = async (userId: any, updatedData: any) => {
		setIsLoading(true);
		try {
			await axios.put(
				`${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${userId}`,
				{
					data: updatedData,
				},
				{
					headers: {
						Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
					},
				}
			);
			setUsers((prev) =>
				prev.map((user) => (user.id === userId ? { ...user, ...updatedData } : user))
			);
			setSuccess(true);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<UserContext.Provider
			value={{
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
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
