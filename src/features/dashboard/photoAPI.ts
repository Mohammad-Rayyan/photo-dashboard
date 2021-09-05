import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPhoto } from "../../types/photoAPI";

export const photoApi = createApi({
  reducerPath: "photoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (build) => ({
    getPhotos: build.query<IPhoto[], void>({
      query: () => ({ url: `photos` }),
      transformResponse: (response: IPhoto[]) => (response || []).slice(0, 500),
    }),
  }),
});

export const { useGetPhotosQuery } = photoApi;
