"use client";
// Packages
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { PURGE } from "redux-persist";
import { IUser } from "@/utils/types/types";

export interface userState {
    user: Partial<IUser>;
};

const initialState: userState = {
    user: undefined!
};

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(PURGE, (state) => {
            storage.removeItem('persist:root');
            return initialState;
        })
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;