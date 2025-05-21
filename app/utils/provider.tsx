'use client';
import React from 'react';
// import { Provider } from 'react-redux';
// import { SessionProvider } from 'next-auth/react';
// import { store } from '../store/store';
import { ProgressProvider } from '@bprogress/next/dist/app';
import { SessionProvider } from 'next-auth/react';
import { store } from '@/utils/APISlice/store';
import { Provider } from 'react-redux';
import { AttendanceProvider } from '@/utils/AttendanceContext';
import { OfficeLocationProvider } from '@/utils/OfficeLocationContext';
import { UserProvider } from '@/utils/UserContext';
// import "react-loading-skeleton/dist/skeleton.css";

const NewProvider = ({ children, session }: React.PropsWithChildren<{ session: any }>) => {
	return (
		<SessionProvider session={session}>
			<ProgressProvider
				height="4px"
				color="#002DB3"
				options={{ showSpinner: false }}
				shallowRouting>
				<Provider store={store}>
					<UserProvider>
						<AttendanceProvider>
							<OfficeLocationProvider>
								{children}
							</OfficeLocationProvider>
						</AttendanceProvider>
					</UserProvider>
				</Provider>
			</ProgressProvider>
		</SessionProvider>
	);
}

export default NewProvider;
