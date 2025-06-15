import { configureStore } from "@reduxjs/toolkit";
import genieReducer from "./features/genieSlice";

export const store = configureStore({
  reducer: {
    genie: genieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
