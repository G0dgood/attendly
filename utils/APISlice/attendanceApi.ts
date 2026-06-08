import { baseApi } from './baseApi';

export const attendanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAttendance: builder.query<any, void>({
      query: () => '/attendance',
      providesTags: ['Attendance'],
    }),
    getAttendanceParams: builder.query<any, any>({
      query: (params) => ({
        url: '/attendance',
        params: {
          page: params.page,
          limit: params.limit,
          filterByDate: params.filterByDate,
          startDate: params.startDate,
          endDate: params.endDate,
        },
      }),
      providesTags: ['Attendance'],
    }),
    getAttendanceSummary: builder.query<any, { id: string; params: any }>({
      query: ({ id, params }) => ({
        url: `/attendance/summary/${id}`,
        params: {
          page: params.page,
          limit: params.limit,
          filterByDate: params.filterByDate,
          startDate: params.startDate,
          endDate: params.endDate,
        },
      }),
    }),
    addAttendanceManual: builder.mutation<any, any>({
      query: (body) => ({
        url: '/attendance/manual',
        method: 'POST',
        body,
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
} = attendanceApi;
