import { configureStore } from "@reduxjs/toolkit";
import movies from "../reducers/moviesSlice";

const store = configureStore({
  reducer: { movies },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
