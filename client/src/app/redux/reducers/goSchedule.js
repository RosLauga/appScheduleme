import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

// Define a service using a base URL and expected endpoints
export const goSchedule = createApi({
  reducerPath: "goSchedule",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints: (builder) => ({
    getSchedule: builder.query({
      query: () => ({
        url: "/schedule",
        method: "get",
      }),
    }),
    postSchedule: builder.mutation({
      query: (data) => ({
        url: "/schedule",
        method: "post",
        data: data,
      }),
    }),
  }),
});

export const { useGetScheduleQuery, usePostScheduleMutation } = goSchedule;
