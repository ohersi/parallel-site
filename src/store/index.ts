"use client";
// Packages
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import expireReducer from "redux-persist-expire";
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
// Imports
import modalReducer from "@/store/modalSlice";
import userSliceReducer from "@/store/userSlice";
import formTypeReducer from "@/store/formTypeSlice";
import buttonTypeReducer from "@/store/buttonTypeSlice";
import filterTypeReducer from "@/store/filterTypeSlice";
import searchSliceReducer from "@/store/searchSlice";
import blockClickedSliceReducer from "@/store/blockClickedSlice";
import menuSliceReducer from "@/store/menuSlice";
import themeSliceReducer from "@/store/themeSlice";

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['Modal', 'Form', 'Button', 'Filter', 'Search', 'Block', 'Menu', 'Theme'],
  whitelist: ['User'],
  transforms: [
    expireReducer('User', {
      persistedAtKey: '__persisted_at',
      expireSeconds: 3600, // 1hr
      expiredState: undefined,
      autoExpire: true,
    })
  ],
}
const rootReducer = combineReducers({
  Modal: modalReducer,
  User: userSliceReducer,
  Form: formTypeReducer,
  Button: buttonTypeReducer,
  Filter: filterTypeReducer,
  Search: searchSliceReducer,
  Block: blockClickedSliceReducer,
  Menu: menuSliceReducer,
  Theme: themeSliceReducer,
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