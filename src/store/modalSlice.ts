"use client";
// Packages
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface modalState {
    isOpen: boolean;
    isBlockModalOpen: boolean;
}

const initialState: modalState = {
    isOpen: false,
    isBlockModalOpen: false
};

const modalSlice = createSlice({
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

export const { setIsOpen, setIsBlockModalOpen } = modalSlice.actions;
export default modalSlice.reducer;
