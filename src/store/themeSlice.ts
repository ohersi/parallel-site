"use client";
// Imports
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface themeState {
    theme: string;
}

const initialState: themeState = {
    theme: '',
};

const themeSlice = createSlice({
    name: "Theme",
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
