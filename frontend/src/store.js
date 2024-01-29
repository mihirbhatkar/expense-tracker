import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlices.js";
import walletReducer from "./Slices/walletsSlice.js";
import { apiSlice } from "./Slices/apiSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    wallets: walletReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
