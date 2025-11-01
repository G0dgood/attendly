'use client';
import React, { useEffect } from 'react';
import { ProgressProvider } from '@bprogress/next/dist/app';
import { store } from '@/utils/APISlice/store';
import { Provider, useDispatch } from 'react-redux';
import { initializeAuth } from '@/utils/APISlice/authSlice';

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		// Initialize auth from localStorage on mount
		dispatch(initializeAuth());
	}, [dispatch]);

	return <>{children}</>;
};

const NewProvider = ({ children }: React.PropsWithChildren) => {
	return (
		<Provider store={store}>
			<ProgressProvider
				height="4px"
				color="#2563EB"
				options={{ showSpinner: false }}
				shallowRouting>
				<AuthInitializer>
					{children}
				</AuthInitializer>
			</ProgressProvider>
		</Provider>
	);
}

export default NewProvider;
