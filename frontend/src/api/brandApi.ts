import { api } from './index';
import type { Brand } from '../interfaces';

export const brandApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBrands: build.query<
      { data: Brand[]; success: boolean; error: any },
      void
    >({
      query: () => 'brands/all',
      providesTags: ['Brand'],
    }),
    createBrand: build.mutation<
      { data: Brand; success: boolean; error: any },
      Partial<Brand>
    >({
      query: (body) => ({
        url: 'brands/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Brand'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetBrandsQuery, useCreateBrandMutation } = brandApi;
