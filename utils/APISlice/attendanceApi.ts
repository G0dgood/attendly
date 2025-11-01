import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './authApi'; // Re-use baseQueryWithAuth

export const attendanceApi = createApi({
  reducerPath: 'attendanceApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Attendance'],
  endpoints: (builder) => ({
    // Attendance endpoints
    getAttendance: builder.query<any, void>({
      query: () => '/attendance',
      providesTags: ['Attendance'],
    }),
    getAttendanceParams: builder.query<any, { page?: number; limit?: number; filterByDate?: string; startDate?: string; endDate?: string }>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.filterByDate) queryParams.append('filterByDate', params.filterByDate);
        if (params.startDate) queryParams.append('startDate', params.startDate);
        if (params.endDate) queryParams.append('endDate', params.endDate);
        return `/attendance?${queryParams.toString()}`;
      },
      providesTags: ['Attendance'],
    }),
    getAttendanceSummary: builder.query<any, { userId?: string; page?: number; limit?: number; filterByDate?: string; startDate?: string; endDate?: string }>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.filterByDate) queryParams.append('filterByDate', params.filterByDate);
        if (params.startDate) queryParams.append('startDate', params.startDate);
        if (params.endDate) queryParams.append('endDate', params.endDate);
        return `/attendance/summary/${params.userId}?${queryParams.toString()}`;
      },
      providesTags: ['Attendance'],
    }),
    addAttendanceManual: builder.mutation<any, any>({
      query: (input) => ({
        url: '/attendance/manual',
        method: 'POST',
        body: input,
      }),
      invalidatesTags: ['Attendance'],
    }),
    updateAttendance: builder.mutation<any, { recordId: string; status: any }>({
      query: ({ recordId, status }) => ({
        url: `/attendance/${recordId}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Attendance'],
    }),
  }),
});

export const {
  useGetAttendanceQuery,
  useGetAttendanceParamsQuery,
  useGetAttendanceSummaryQuery,
  useAddAttendanceManualMutation,
  useUpdateAttendanceMutation,
} = attendanceApi;

