import { api } from './index';
import type { Sneaker } from '../interfaces';

export const sneakerApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSneakers: build.query<
      {
        data: { sneakers: Sneaker[]; count: number };
        success: boolean;
        error: any;
      },
      { type_id?: number; brand_id?: number; page?: number; limit?: number }
    >({
      query: (params) => ({
        url: 'sneakers/all',
        params,
      }),
      providesTags: ['Sneaker'],
    }),
    getOneSneaker: build.query<
      { data: Sneaker; success: boolean; error: any },
      number
    >({
      query: (id) => `sneakers/one/${id}`,
      providesTags: (result, error, id) => [{ type: 'Sneaker', id }],
    }),
    createSneaker: build.mutation<
      { data: Sneaker; success: boolean; error: any },
      FormData
    >({
      query: (body) => ({
        url: 'sneakers/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Sneaker'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetSneakersQuery,
  useGetOneSneakerQuery,
  useCreateSneakerMutation,
} = sneakerApi;
