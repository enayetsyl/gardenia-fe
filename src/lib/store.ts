import { configureStore } from '@reduxjs/toolkit';
import CounterSlice from './features/CounteState/CounterSlice';
import { authApi } from './api/authApi';
import UserReducer from './features/UserState/UserSlice';
import { userApi } from './api/userApi';
export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: CounterSlice,
      user: UserReducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, userApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
