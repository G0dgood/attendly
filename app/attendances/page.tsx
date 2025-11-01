"use client";
import React from 'react';
import PageHeader from '@/components/PageHeader';

export const dynamic = 'force-dynamic';

const Attendance = () => {
	return (
		<div className='w-full'>
			<PageHeader text={"Attendance"} />
			<div className="text-center py-20">
				<p className="text-gray-500">Attendance page is being migrated to RTK Query</p>
			</div>
		</div>
	);
}

export default Attendance;
