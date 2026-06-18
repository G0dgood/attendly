'use client';
import React from 'react';
import { ProgressProvider } from '@bprogress/next/dist/app';
import { SessionProvider } from 'next-auth/react';
import { store } from '@/utils/APISlice/store';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import NetworkStatusHandler from '@/components/NetworkStatusHandler';

interface NewProviderProps {
	children: React.ReactNode;
	session: any;
}

const NewProvider: React.FC<NewProviderProps> = ({ children, session }) => {
	return (
		<SessionProvider session={session}>
			<Toaster
				position="top-right"
				theme="light"
				richColors
				closeButton
				toastOptions={{
					style: { borderRadius: 0 },
				}}
			/>
			<NetworkStatusHandler />
			<ProgressProvider
				height="4px"
				color="#2563EB"
				options={{ showSpinner: false }}
				shallowRouting>
				<Provider store={store}>
					{children}
				</Provider>
			</ProgressProvider>
		</SessionProvider>
	);
}

export default NewProvider;
