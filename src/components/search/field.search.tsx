"use client";
// Imports
import { useAppDispatch, useAppSelector } from "@/store";
import { setSearch } from "@/store/searchSlice";

interface ISearchField {
    handleClick: () => Promise<void>
}

const SearchField = ({ handleClick }: ISearchField) => {

    const dispatch = useAppDispatch();
    const search = useAppSelector((state) => state.Search.search);
    const searchType = useAppSelector((state) => state.Search.searchType);

    return (
        <>
            <input type="text"
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                placeholder={searchType}
            />
            <button onClick={handleClick}>Search in Field</button>
            <div>{search}</div>
        </>
    )
};

export default SearchField;