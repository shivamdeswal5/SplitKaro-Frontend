import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import groupsReducer from './groups/group-slice'
import expenseReducer from './expense/expense-slice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] 
}

const rootReducer = combineReducers({
    auth: authReducer,
    groups: groupsReducer,
    expense: expenseReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store =  configureStore({
    reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store); 