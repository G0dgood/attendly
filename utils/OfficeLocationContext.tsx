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
	success: boolean;
	successUpdate: boolean;
	officeLocationsError: any;
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setSuccessUpdate: React.Dispatch<React.SetStateAction<boolean>>;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setIsLoadingCreate: React.Dispatch<React.SetStateAction<boolean>>;
	setIsLoadingUpdate: React.Dispatch<React.SetStateAction<boolean>>;
	isLoadingCreate: boolean;
	isLoadingUpdate: boolean;
}

const OfficeLocationContext = createContext<OfficeLocationContextType | null>(null);

export const useOfficeLocation: any = () => useContext(OfficeLocationContext);

export const OfficeLocationProvider = ({ children }: { children: React.ReactNode }) => {
	const { token } = useUserPrivileges();
	const [officeLocations, setOfficeLocations] = useState<Office[]>([]);
	const [officeLocationsError, setOfficeLocationsError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingCreate, setIsLoadingCreate] = useState(false);
	const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
	const [selectedOfficeId, setSelectedOfficeId] = useState<string | null>(null);
	const [error, setError] = useState<unknown>(null);
	const [success, setSuccess] = useState<boolean>(false);
	const [successUpdate, setSuccessUpdate] = useState<boolean>(false);
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
			setIsLoading(true);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	const addOfficeLocation = async (name: string, address: string) => {
		setIsLoadingCreate(true);
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
			setSuccess(true);
			setIsLoadingCreate(false);
		} catch (err) {
			setError(err);
		} finally {
			setIsLoadingCreate(false);
		}
	};

	const updateOfficeLocation = async (id: string, inputs: any) => {
		setIsLoadingUpdate(true);
		try {
			axios.patch(
				`${process.env.NEXT_PUBLIC_BASE_URL}/office-location/${id}`,
				inputs,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setSuccessUpdate(true);
			setIsLoadingUpdate(false);
		} catch (err: any) {
			setOfficeLocationsError(err)
		} finally {
			setIsLoadingUpdate(false);
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
				setSuccessUpdate,
				successUpdate,
				isLoadingCreate,
				isLoadingUpdate,
				setIsLoadingCreate,
				setIsLoadingUpdate,
				officeLocationsError
			}}
		>
			{children}
		</OfficeLocationContext.Provider>
	);
};
