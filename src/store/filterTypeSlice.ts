"use client";
// Packages
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// Imports
import { FEED, SORT } from "@/utils/types/types";

export interface filterTypeState {
    viewType: string;
    sortType: string;
}

const initialState: filterTypeState = {
    viewType: FEED.CHANNEL,
    sortType: SORT.RECENTLY_UPDATED,
};

const filterTypeSlice = createSlice({
    name: "Filter",
    initialState,
    reducers: {
        setViewType: (state, action: PayloadAction<string>) => {
            state.viewType = action.payload
        },
        setSortType: (state, action: PayloadAction<string>) => {
            state.sortType = action.payload
        },
    },
});

export const { setViewType, setSortType } = filterTypeSlice.actions;
export default filterTypeSlice.reducer;
