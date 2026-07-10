import { NoRecordFound, SVGLoaderFetch } from '@/components/Options';
import { useGetAttendanceQuery } from '@/utils/APISlice/attendanceApi';
import moment from 'moment';
import { getAttendanceStatus } from '@/utils/timeUtils';

const AttendanceList = () => {
	const { data: attendanceData, isLoading, error } = useGetAttendanceQuery();

	// Merge API data
	const attendanceRecords = attendanceData?.data?.data?.data || attendanceData?.data?.data || attendanceData?.data || [];
	const dataToRender = Array.isArray(attendanceRecords) ? [...attendanceRecords].slice(0, 6) : [];

	// Determine status based on clockIn time and shift start time
	const getStatus = (clockIn: string | null, shiftStartTime?: string | null) => {
		if (!clockIn) return 'Absent';

		const clockInDate = new Date(clockIn);
		return getAttendanceStatus(clockInDate, shiftStartTime);
	};

	return (
		<div className='table-responsive-vertical h-85'>
			<div className='table-container'>
				<table className='table'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Day</th>
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
								const shiftStartTime = record.user?.shift?.startTime;
								const status = getStatus(record?.clockIn || null, shiftStartTime);
								const clockInDate = record?.clockIn ? new Date(record?.clockIn) : null;
								const day = clockInDate ? moment(clockInDate).format('dddd') : '—';

								// Dynamic style based on status
								const statusStyle = {
									'Early': 'bg-[#ECFDF3] border-[#ABEFC6] text-[#067647]',
									'Late': 'bg-[#FEF3F2] border-[#FECDCA] text-[#B42318]',
									'Absent': 'bg-[#FFFAF0] border-[#FEDF89] text-[#B54708]',
									'On Leave': 'bg-[#F0F9FF] border-[#B9E6FE] text-[#026AA2]',
									'Unknown': 'bg-[#FEF2F2] border-[#FCA5A5] text-[#B91C1C]',
									'N/A': 'bg-gray-100 text-gray-600'
								}[status] || 'bg-gray-100 text-gray-600';

								return (
									<tr key={record?.id}>
										<td data-title='Full Name' className='whitespace-nowrap'>{employeeName}</td>
										{/* <td data-title='Email'>{employeeEmail}</td> */}
										<td data-title='Day'>{day}</td>
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
