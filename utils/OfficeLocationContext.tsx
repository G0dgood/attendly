"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUserPrivileges } from "./userPrivileges";

interface Office {
	id: string;
	name: string;
	address: string;
	createdAt?: string;
	updatedAt?: string;
}

interface OfficeLocationContextType {
	officeLocations: Office[];
	isLoading: boolean;
	fetchOfficeLocations: () => Promise<void>;
	addOfficeLocation: (name: string, address: string) => Promise<void>;
	updateOfficeLocation: (officeId: string, updatedData: Partial<Office>) => Promise<void>;
	selectedOfficeId: string | null;
	setSelectedOfficeId: React.Dispatch<React.SetStateAction<string | null>>;
	error: unknown;
	setError: React.Dispatch<React.SetStateAction<unknown>>;
	success: boolean | null;
	setSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OfficeLocationContext = createContext<OfficeLocationContextType | null>(null);

export const useOfficeLocation: any = () => useContext(OfficeLocationContext);

export const OfficeLocationProvider = ({ children }: { children: React.ReactNode }) => {
	const { token } = useUserPrivileges();
	const [officeLocations, setOfficeLocations] = useState<Office[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>(null);
	const [error, setError] = useState<unknown>(null);
	const [success, setSuccess] = useState<boolean | null>(null);
	const [modalOpen, setModalOpen] = useState(false);

	const fetchOfficeLocations = async () => {
		setIsLoading(true);
		try {
			const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/office-location`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setOfficeLocations(res?.data?.data || []);
			setSuccess(true);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	const addOfficeLocation = async (name: string, address: string) => {
		setIsLoading(true);
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/office-location`,
				{ name, address },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setOfficeLocations((prev) => [...prev, res.data?.data]);
			setSuccess(true);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	const updateOfficeLocation = async (officeId: string, updatedData: Partial<Office>) => {
		setIsLoading(true);
		try {
			const res = await axios.put(
				`${process.env.NEXT_PUBLIC_BASE_URL}/office-location/${officeId}`,
				updatedData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setOfficeLocations((prev) =>
				prev.map((office) =>
					office.id === officeId ? { ...office, ...updatedData } : office
				)
			);
			setSuccess(true);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<OfficeLocationContext.Provider
			value={{
				officeLocations,
				isLoading,
				fetchOfficeLocations,
				addOfficeLocation,
				updateOfficeLocation,
				selectedOfficeId,
				setSelectedOfficeId,
				error,
				setError,
				success,
				setSuccess,
				modalOpen,
				setModalOpen,
			}}
		>
			{children}
		</OfficeLocationContext.Provider>
	);
};
