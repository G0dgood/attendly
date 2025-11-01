import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://attendance-tracker-backend-8z00.onrender.com';

// Create a custom base query that handles auth headers
const baseQueryWithAuth = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux state
    const state = getState() as any;
    const token = state?.auth?.token;
    
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    
    return headers;
  },
});

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

