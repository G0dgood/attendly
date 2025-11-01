// Consolidated API exports - all RTK Query APIs are now in separate files
export { authApi, useLoginMutation } from './authApi';
export { userApi, useGetUsersQuery, useGetUsersParamsQuery, useAddUserMutation, useUpdateUserMutation, useQrTokenMutation } from './userApi';
export { attendanceApi, useGetAttendanceQuery, useGetAttendanceParamsQuery, useGetAttendanceSummaryQuery, useAddAttendanceManualMutation, useUpdateAttendanceMutation } from './attendanceApi';
export { officeApi, useGetOfficeLocationsQuery, useAddOfficeLocationMutation, useUpdateOfficeLocationMutation } from './officeApi';
