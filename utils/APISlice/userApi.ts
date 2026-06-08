import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    getUsersParams: builder.query<any, any>({
      query: (params) => ({
        url: '/users',
        params: {
          page: params.page,
          limit: params.limit,
          filterByDate: params.filterByDate,
          startDate: params.startDate,
          endDate: params.endDate,
        },
      }),
      providesTags: ['User'],
    }),
    registerUser: builder.mutation<any, any>({
      query: (body) => ({
        url: '/users/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<any, { userId: string; updatedData: any }>({
      query: ({ userId, updatedData }) => ({
        url: `/users/${userId}`,
        method: 'PATCH',
        body: { data: updatedData },
      }),
      invalidatesTags: ['User'],
    }),
    createQrToken: builder.mutation<any, any>({
      query: (body) => ({
        url: '/qr-token',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUsersParamsQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useCreateQrTokenMutation,
} = userApi;
