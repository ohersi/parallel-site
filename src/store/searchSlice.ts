"use client";
// Imports
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { SEARCH } from "@/utils/types/types";

export interface searchState {
    search: string;
    searchType: string;
}

const initialState: searchState = {
    search: '',
    searchType: SEARCH.USER
};

const searchSlice = createSlice({
    name: "Search",
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setSearchType: (state, action: PayloadAction<string>) => {
            state.searchType = action.payload
        },
    },
});

export const { setSearch, setSearchType } = searchSlice.actions;
export default searchSlice.reducer;
