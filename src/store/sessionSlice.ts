"use client";
// Packages
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface sessionState {
    session: boolean;
}

const initialState: sessionState = {
    session: false
};

const sessionSlice = createSlice({
    name: "Session",
    initialState,
    reducers: {
        setSession: (state, action: PayloadAction<boolean>) => {
            state.session = action.payload
        },
    },
});

export const { setSession } = sessionSlice.actions;
export default sessionSlice.reducer;