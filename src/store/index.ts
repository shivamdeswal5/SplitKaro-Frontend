import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';
import groupsReducer from './groups/group-slice'
import expenseReducer from './expense/expense-slice'
import notificationReducer from './notification/notification-slice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import settlementReducer from './settlements/settlement-slice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] 
}

const rootReducer = combineReducers({
    auth: authReducer,
    groups: groupsReducer,
    expense: expenseReducer,
    notification: notificationReducer,
    settlements: settlementReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store =  configureStore({
    reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store); 