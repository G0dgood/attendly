"use client";
import React from 'react';
import PageHeader from '@/components/PageHeader';

export const dynamic = 'force-dynamic';

const OfficeLocation = () => {
	return (
		<div className='w-full'>
			<PageHeader text={"Office Location"} />
			<div className="text-center py-20">
				<p className="text-gray-500">Office Location page is being migrated to RTK Query</p>
			</div>
		</div>
	);
}

export default OfficeLocation;
