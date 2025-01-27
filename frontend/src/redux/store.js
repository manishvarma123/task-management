import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/userSlice.js';
import taskSlice from './slices/taskSlice.js';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key : 'root',
    storage
}

const appReducer = combineReducers({
    user : userSlice,
    task : taskSlice
})

const rootReducer = (state,action) => {
    if(action.type === 'LOGOUT_USER'){
        state = undefined;  //clears the redux state
    }
    return appReducer(state,action);
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

const persistor = persistStore(store)

export {store, persistor};