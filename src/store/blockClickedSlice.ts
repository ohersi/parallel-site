"use client";
// Packages
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface blockClickedTypeState {
    blockClicked: number | undefined;
}

const initialState: blockClickedTypeState = {
    blockClicked: undefined
};

const blockClickedSlice = createSlice({
    name: "Block",
    initialState,
    reducers: {
        setBlockClicked: (state, action: PayloadAction<number | undefined>) => {
            state.blockClicked = action.payload
        },
    },
});

export const { setBlockClicked } = blockClickedSlice.actions;
export default blockClickedSlice.reducer;
