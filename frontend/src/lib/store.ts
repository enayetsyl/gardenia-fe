import { configureStore } from '@reduxjs/toolkit';
import CounterSlice from './features/CounteState/CounterSlice';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import { postApi } from './api/postApi';
import UserReducer from './features/UserState/UserSlice';
import { adminApi } from './api/adminApi';


export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: CounterSlice,
      user: UserReducer,
      [postApi.reducerPath]: postApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [adminApi.reducerPath]: adminApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, postApi.middleware, adminApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
