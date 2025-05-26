import { NoRecordFound, SVGLoaderFetch } from '@/components/Options';
import { useAttendance } from '@/utils/AttendanceContext';
import React, { useEffect, useState } from 'react'

const AttendanceList = () => {
	const attendanceContext: any = useAttendance();
	const { attendanceRecords, fetchAttendance, isLoading, error } = attendanceContext || {};





	useEffect(() => {
		if (fetchAttendance) {
			fetchAttendance();
		}
	}, []);


	// Merge API data with mock "soner"
	const dataToRender = [
		...(attendanceRecords?.data?.data || attendanceRecords || [])
	];
	return (
		<div className='table-responsive-vertical'>
			<div className='table-container'>
				<table className={true ? "table" : "table-hover table-mc-light-blue"}>
					<thead>
						<tr>
							<th>Employee Name</th>
							<th>Email</th>
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
								const status = record.status || 'On Time'; // Default status if not present

								return (
									<tr key={record.id}>
										<td data-title='Full Name'>{employeeName}</td>
										<td data-title='Email'>{employeeEmail}</td>
										<td data-title='Check In'>{checkIn}</td>
										<td data-title='Check Out'>{checkOut}</td>
										<td data-title='Total Hour'>{totalHour}</td>
										<td data-title='Status'>
											<div
												className={`whitespace-nowrap flex flex-row justify-center items-center px-[6px] py-[4px] w-[60px] h-[22px] 
                border font-medium text-[12px] leading-[18px] 
                ${status === 'On Time'
														? 'bg-[#ECFDF3] border-[#ABEFC6] text-[#067647]'
														: status === 'Late'
															? 'bg-[#FEF3F2] border-[#FECDCA] text-[#B42318]'
															: status === 'Absent'
																? 'bg-[#FFFAF0] border-[#FEDF89] text-[#B54708]'
																: status === 'On Leave'
																	? 'bg-[#F0F9FF] border-[#B9E6FE] text-[#026AA2]'
																	: 'bg-[#FEF2F2] border-[#FCA5A5] text-[#B91C1C]'
													}`}
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
	)
}

export default AttendanceList
