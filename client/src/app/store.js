import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer, cartReducer);
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    cart: persistedReducer
  },
});
export const persistor = persistStore(store);
