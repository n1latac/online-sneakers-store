import { api } from './index';
import type { Type } from '../interfaces';

export const typeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTypes: build.query<{ data: Type[]; success: boolean; error: any }, void>(
      {
        query: () => 'types/all',
        providesTags: ['Type'],
      },
    ),
    createType: build.mutation<
      { data: Type; success: boolean; error: any },
      Partial<Type>
    >({
      query: (body) => ({
        url: 'types/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Type'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetTypesQuery, useCreateTypeMutation } = typeApi;
