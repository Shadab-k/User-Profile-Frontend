import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import RootReducer from './rootReducer'
import {persistReducer, persistStore} from "redux-persist"
const create_Logger = require('redux-logger');
const logger = create_Logger.createLogger()


const persistConfig={
    key: "root",
    storage,
    whitelist:["AuthSlice"],
}
const persistedReducer= persistReducer(persistConfig, RootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(logger),
  });

const persister = persistStore(store)
export default persister;