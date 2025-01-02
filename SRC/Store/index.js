import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import combineReducer from "./combineReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["authReducer", "commonReducer"],
};

const persistedReducer = persistReducer(persistConfig, combineReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { persistor, store };

