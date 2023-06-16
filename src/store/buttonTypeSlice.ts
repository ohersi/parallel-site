"use client";
// Packages
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface buttonTypeState {
    buttonType: string;
}

const initialState: buttonTypeState = {
    buttonType: ''
};

const buttonTypeSlice = createSlice({
    name: "Button",
    initialState,
    reducers: {
        setButtonType: (state, action: PayloadAction<string>) => {
            state.buttonType = action.payload
        },
    },
});

export const { setButtonType } = buttonTypeSlice.actions;
export default buttonTypeSlice.reducer;
