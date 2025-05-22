import { api } from './index';
import { User } from '../interfaces';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    registration: build.mutation<User, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: {
        data: { user: User; accessToken: string };
      }) => {
        const { user, accessToken } = response.data;
        localStorage.setItem('token', accessToken);
        return user;
      },
      invalidatesTags: ['User'],
    }),
    login: build.mutation<User, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: {
        data: { user: User; accessToken: string };
      }) => {
        const { user, accessToken } = response.data;
        localStorage.setItem('token', accessToken);
        return user;
      },
      invalidatesTags: ['User'],
    }),
    checkAuth: build.query<User, void>({
      query: () => 'auth/check',
      transformResponse: (response: {
        data: { user: User; accessToken: string };
      }) => {
        const { user, accessToken } = response.data;
        localStorage.setItem('token', accessToken);
        return user;
      },
      providesTags: ['User'],
    }),
    refresh: build.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: 'auth/refresh',
        method: 'POST',
      }),
      transformResponse: (response: { data: { accessToken: string } }) => {
        console.log(response.data);
        const { accessToken } = response.data;
        localStorage.setItem('token', accessToken);
        return { accessToken };
      },
      invalidatesTags: ['User'],
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'GET',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem('token');
        } catch {
          localStorage.removeItem('token');
        }
      },
      // invalidatesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useCheckAuthQuery,
  useRefreshMutation,
  useLogoutMutation,
} = userApi;
