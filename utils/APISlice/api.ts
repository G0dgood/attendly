import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://attendance-tracker-backend-8z00.onrender.com';

// Create a custom base query that handles auth headers
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers, { endpoint }) => {
    // Don't add auth headers for login endpoint
    if (endpoint === 'login') {
      return headers;
    }
    
    if (typeof window !== 'undefined') {
      const session = await getSession();
      if (session?.user?.token) {
        headers.set('authorization', `Bearer ${session.user.token}`);
      }
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['User', 'Attendance', 'OfficeLocation'],
  endpoints: (builder) => ({
    // Auth endpoints (no auth required)
    login: builder.mutation<any, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // User endpoints
    getUsers: builder.query<any, void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    getUsersParams: builder.query<any, { page?: number; limit?: number; filterByDate?: string; startDate?: string; endDate?: string }>({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.filterByDate) queryParams.append('filterByDate', params.filterByDate);
        if (params.startDate) queryParams.append('startDate', params.startDate);
        if (params.endDate) queryParams.append('endDate', params.endDate);
        return `/users?${queryParams.toString()}`;
      },
      providesTags: ['User'],
    }),
    addUser: builder.mutation<any, any>({
      query: (userData) => ({
        url: '/users/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<any, { userId: string; data: any }>({
      query: ({ userId, data }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: { data },
      }),
      invalidatesTags: ['User'],
    }),
    qrToken: builder.mutation<any, any>({
      query: (input) => ({
        url: '/qr-token',
        method: 'POST',
        body: input,
      }),
    }),

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

    // Office Location endpoints
    getOfficeLocations: builder.query<any, void>({
      query: () => '/office-location',
      providesTags: ['OfficeLocation'],
    }),
    addOfficeLocation: builder.mutation<any, { name: string; address: string }>({
      query: (data) => ({
        url: '/office-location',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['OfficeLocation'],
    }),
    updateOfficeLocation: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/office-location/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['OfficeLocation'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUsersQuery,
  useGetUsersParamsQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useQrTokenMutation,
  useGetAttendanceQuery,
  useGetAttendanceParamsQuery,
  useGetAttendanceSummaryQuery,
  useAddAttendanceManualMutation,
  useUpdateAttendanceMutation,
  useGetOfficeLocationsQuery,
  useAddOfficeLocationMutation,
  useUpdateOfficeLocationMutation,
} = api;

