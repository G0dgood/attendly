import { baseApi } from './baseApi';

export const officeLocationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOfficeLocations: builder.query<any, void>({
      query: () => '/office-location',
      providesTags: ['OfficeLocation'],
    }),
    addOfficeLocation: builder.mutation<any, { name: string; address: string }>({
      query: (body) => ({
        url: '/office-location',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['OfficeLocation'],
    }),
    updateOfficeLocation: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/office-location/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['OfficeLocation'],
    }),
  }),
});

export const {
  useGetOfficeLocationsQuery,
  useAddOfficeLocationMutation,
  useUpdateOfficeLocationMutation,
} = officeLocationApi;
