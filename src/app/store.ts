import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { photoApi } from "../features/dashboard/photoAPI";
import photoDashboardReducer from "../features/dashboard/photoSlice";

export const store = configureStore({
  reducer: {
    photoDashboard: photoDashboardReducer,
    [photoApi.reducerPath]: photoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(photoApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
