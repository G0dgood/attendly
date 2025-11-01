import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './authApi'; // Re-use baseQueryWithAuth

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetUsersQuery,
  useGetUsersParamsQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useQrTokenMutation,
} = userApi;
