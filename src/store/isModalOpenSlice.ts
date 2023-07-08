"use client";
// Packages
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface isOpenState {
    isOpen: boolean;
    isBlockModalOpen: boolean;
}

const initialState: isOpenState = {
    isOpen: false,
    isBlockModalOpen: false
};

const isModalOpenSlice = createSlice({
    name: "Modal",
    initialState,
    reducers: {
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload
        },
        setIsBlockModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isBlockModalOpen = action.payload
        },
    },
});

export const { setIsOpen, setIsBlockModalOpen } = isModalOpenSlice.actions;
export default isModalOpenSlice.reducer;
