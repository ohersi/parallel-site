"use client";
// Packages
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ReactNode } from "react";

export interface formTypeState {
    formType: string;
}

const initialState: formTypeState = {
    formType: '' 
};

const formTypeSlice = createSlice({
    name: "Form",
    initialState,
    reducers: {
        setFormType: (state, action: PayloadAction<string>) => {
            state.formType = action.payload
        },
    },
});

export const { setFormType } = formTypeSlice.actions;
export default formTypeSlice.reducer;
