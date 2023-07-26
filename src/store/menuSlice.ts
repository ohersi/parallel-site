"use client";
// Packages
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface menuState {
    isMenuOpen: boolean;
}

const initialState: menuState = {
    isMenuOpen: false
};

const menuSlice = createSlice({
    name: "Menu",
    initialState,
    reducers: {
        setIsMenuOpen: (state, action: PayloadAction<boolean>) => {
            state.isMenuOpen = action.payload
        },
    },
});

export const { setIsMenuOpen } = menuSlice.actions;
export default menuSlice.reducer;