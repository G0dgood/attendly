import { NoRecordFound, SVGLoaderFetch } from '@/components/Options';
import React from 'react'
import { useGetAttendanceQuery } from '@/utils/APISlice/api';

const AttendanceList = () => {
	const { data: attendanceRecords, isLoading } = useGetAttendanceQuery();

	// Helper function to safely get attendance data
	const getAttendanceData = (data: any) => {
		if (Array.isArray(data)) return data;
		if (data?.data && Array.isArray(data.data)) return data.data;
		return [];
	};

	// Merge API data - ensure arrays
	const dataToRender = [
		...getAttendanceData(attendanceRecords).slice(0, 6)
	];

	// Determine status based on clockIn time
	const getStatus = (clockIn: string | null) => {
		if (!clockIn) return 'Absent';

		const clockInDate = new Date(clockIn);
		const cutoffDate = new Date(clockInDate);
		cutoffDate.setHours(8, 0, 0, 0); // Set to 8:00 AM

		return clockInDate > cutoffDate ? 'Late' : 'On Time';
	};

	return (
		<div className='table-responsive-vertical h-85'>
			<div className='table-container'>
				<table className='table'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Check In</th>
							<th>Check Out</th>
							<th>Total Hour</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{isLoading ? (
							<SVGLoaderFetch colSpan={6} />
						) : dataToRender?.length === 0 ? (
							<NoRecordFound colSpan={6} />
						) : (
							dataToRender.map((record: any) => {
								const checkIn = record.clockIn
									? new Date(record.clockIn).toLocaleTimeString()
									: '—';
								const checkOut = record.clockOut
									? new Date(record.clockOut).toLocaleTimeString()
									: '—';

								const totalHour = record.clockIn && record.clockOut
									? (
										(new Date(record.clockOut).getTime() -
											new Date(record.clockIn).getTime()) /
										(1000 * 60 * 60)
									).toFixed(2)
									: '—';

								const employeeName = record.user?.name || 'N/A';
								const employeeEmail = record.user?.email || '—';
								const status = getStatus(record?.clockIn || null);

								// Dynamic style based on status
								const statusStyle = {
									'On Time': 'bg-[#ECFDF3] border-[#ABEFC6] text-[#067647]',
									'Late': 'bg-[#FEF3F2] border-[#FECDCA] text-[#B42318]',
									'Absent': 'bg-[#FFFAF0] border-[#FEDF89] text-[#B54708]',
									'On Leave': 'bg-[#F0F9FF] border-[#B9E6FE] text-[#026AA2]',
									'Unknown': 'bg-[#FEF2F2] border-[#FCA5A5] text-[#B91C1C]'
								}[status] || 'bg-gray-100 text-gray-600';

								return (
									<tr key={record?.id}>
										<td data-title='Full Name' className='whitespace-nowrap'>{employeeName}</td>
										{/* <td data-title='Email'>{employeeEmail}</td> */}
										<td data-title='Check In'>{checkIn}</td>
										<td data-title='Check Out'>{checkOut}</td>
										<td data-title='Total Hour'>{totalHour}</td>
										<td data-title='Status'>
											<div
												className={`whitespace-nowrap flex flex-row justify-center items-center px-[6px] py-[4px] w-[60px] h-[22px] 
													border font-medium text-[12px] leading-[18px] ${statusStyle}`}
											>
												{status}
											</div>
										</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AttendanceList;
