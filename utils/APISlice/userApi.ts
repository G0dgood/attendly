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
    getUserById: builder.query<any, string>({
      query: (id) => `/users/${id}`,
      providesTags: ['User'],
    }),
    getUser: builder.query<any, string>({
      query: (id) => `/users/${id}`,
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation<any, any>({
      query: (body) => ({
        url: '/users/update-profile',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updatePassword: builder.mutation<any, any>({
      query: (body) => ({
        url: '/users/update-password',
        method: 'PATCH',
        body,
      }),
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
  useGetUserByIdQuery,
  useGetUserQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useCreateQrTokenMutation,
} = userApi;
