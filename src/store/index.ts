"use client";
// Packages
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Imports
import isModalOpenReducer from "@/store/isModalOpenSlice";
import userSliceReducer from "@/store/userSlice";

export const store = configureStore({
    reducer: {
      Modal: isModalOpenReducer,
      User: userSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
