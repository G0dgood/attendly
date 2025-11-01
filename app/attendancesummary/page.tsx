"use client";
import React from 'react';
import PageHeader from '@/components/PageHeader';

export const dynamic = 'force-dynamic';

const AttendanceSummary = () => {
	return (
		<div className='w-full'>
			<PageHeader text={"Attendance Summary"} />
			<div className="text-center py-20">
				<p className="text-gray-500">Attendance Summary page is being migrated to RTK Query</p>
			</div>
		</div>
	);
}

export default AttendanceSummary;
