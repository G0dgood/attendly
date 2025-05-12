import React, { useState } from 'react'
import Image from "next/image";
import { NoRecordFound, SVGLoaderFetch } from '@/components/Options';
import { attendanceData, timeData } from '@/components/data';

const EmplayeeAttendance = () => {
	const [displayData, setDisplayData] = useState<any[]>(attendanceData)
	const [isLoading, setIsLoading] = useState<boolean>(false)


	return (
		<div>
			<div id='table-container'>
				<div className='table-responsive-vertical'>
					<div className='table-container'>
						<table className={true ? "table" : "table-hover table-mc-light-blue"}>
							<thead>
								<tr>
									<th>Date</th>
									<th>Check In</th>
									<th>Check Out</th>
									<th>Working Hour</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{isLoading ? (
									<SVGLoaderFetch colSpan={8} />
								) : displayData?.length === 0 ? (
									<NoRecordFound colSpan={8}>No employee records found!</NoRecordFound>
								) : (
									displayData.map((user: any) => (
										<tr key={user._id}>
											<td data-title='Employee ID'>{user?.date}</td>
											<td data-title='First Name'>{user?.checkIn}</td>
											<td data-title='Middle Name'>{user?.checkOut || '-'}</td>
											<td data-title='Last Name'>{user?.workingHour}</td>
											<td data-title='Status'>
												<div
													className={`flex flex-row justify-center items-center px-[6px] py-[4px] w-[60px] h-[22px] 
    border font-medium text-[12px] leading-[18px] 
    ${user?.status === 'On Time'
															? 'bg-[#ECFDF3] border-[#ABEFC6] text-[#067647]'
															: 'bg-[#FEF2F2] border-[#FCA5A5] text-[#B91C1C]'}
  `}
												>
													{user?.status || 'On Time'}
												</div>

											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EmplayeeAttendance
