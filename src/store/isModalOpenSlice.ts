"use client";
// Packages
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface isOpenState {
    isOpen: boolean;
}

const initialState: isOpenState = {
    isOpen: false
};

const isModalOpenSlice = createSlice({
    name: "Modal",
    initialState,
    reducers: {
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload
        },
    },
});

export const { setIsOpen } = isModalOpenSlice.actions;
export default isModalOpenSlice.reducer;
