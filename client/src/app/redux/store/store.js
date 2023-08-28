import { configureStore } from "@reduxjs/toolkit";
import { goGPTRequest } from "../reducers/goGPTRequest";
import { goSchedule } from "../reducers/goSchedule";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [goGPTRequest.reducerPath]: goGPTRequest.reducer,
    [goSchedule.reducerPath]: goSchedule.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(goGPTRequest.middleware)
      .concat(goSchedule.middleware),
});
setupListeners(store.dispatch);
