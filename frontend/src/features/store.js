import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { 
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import expenseSlice from "./expenses/expensesSlice.js"
import authSlice from "./user/authSlice.js"
import storage from 'redux-persist/lib/storage' 
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}
const rootReducer = combineReducers({
    auth: authSlice,
    expense: expenseSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})
export const persistor = persistStore(store);