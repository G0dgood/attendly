import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './authApi'; // Re-use baseQueryWithAuth

export const officeApi = createApi({
  reducerPath: 'officeApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['OfficeLocation'],
  endpoints: (builder) => ({
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
  useGetOfficeLocationsQuery,
  useAddOfficeLocationMutation,
  useUpdateOfficeLocationMutation,
} = officeApi;

