'use client';
import { useEffect } from 'react';
import { toast } from 'sonner';

const NetworkStatusHandler = () => {
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const handleOnline = () => {
			toast.success("Connected back", {
				id: "network-status",
				duration: 4000,
			});
		};

		const handleOffline = () => {
			toast.error("Failed to load resource: net::ERR_INTERNET_DISCONNECTED", {
				id: "network-status",
				duration: Infinity, // Stays until connection is restored
			});
		};

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		// If the app loads while already offline
		if (!navigator.onLine) {
			handleOffline();
		}

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	return null;
};

export default NetworkStatusHandler;
