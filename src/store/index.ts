"use client";
// Packages
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
// Imports
import isModalOpenReducer from "@/store/isModalOpenSlice";
import userSliceReducer from "@/store/userSlice";
import formTypeReducer from "@/store/formTypeSlice";
import buttonTypeReducer from "@/store/buttonTypeSlice";
import searchSliceReducer from "@/store/searchSlice";
import blockClickedReducer from "@/store/blockClickedSlice";

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['Modal', 'Form', 'Button', 'Search', 'Block'],
  whitelist: ['User']
}
const rootReducer = combineReducers({
  Modal: isModalOpenReducer,
  User: userSliceReducer,
  Form: formTypeReducer,
  Button: buttonTypeReducer,
  Search: searchSliceReducer,
  Block: blockClickedReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);

// https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/