import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

// Define a service using a base URL and expected endpoints
export const goGPTRequest = createApi({
  reducerPath: "goGPTRequest",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    getTellMyDay: builder.query({
      query: (name) => ({
        url: `/schedulereading/?name=${name}`,
        method: "get",
      }),
    }),
  }),
});

export const { useGetTellMyDayQuery } = goGPTRequest;
