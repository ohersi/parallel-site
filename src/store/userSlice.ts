"use client";
// Packages
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
    user: any;
}

const initialState: userState = {
    user: undefined
};

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;