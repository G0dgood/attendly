'use client';
import React from 'react';
import { ProgressProvider } from '@bprogress/next/dist/app';
import { SessionProvider } from 'next-auth/react';
import { store } from '@/utils/APISlice/store';
import { Provider } from 'react-redux';
import { AttendanceProvider } from '@/utils/AttendanceContext';
import { OfficeLocationProvider } from '@/utils/OfficeLocationContext';
import { UserProvider } from '@/utils/UserContext';

const NewProvider = ({ children, session }: React.PropsWithChildren<{ session: any }>) => {
	return (
		<SessionProvider session={session}>
			<ProgressProvider
				height="4px"
				color="#2563EB"
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
