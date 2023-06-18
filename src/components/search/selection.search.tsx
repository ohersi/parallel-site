"use client";
// Imports
import { useAppDispatch } from "@/store";
import { setSearchType } from "@/store/searchSlice";
import { SEARCH } from "@/utils/types/types";

const SearchSelection = () => {

    const dispatch = useAppDispatch();

    return (
        <>
            <div>
                <div>TYPES</div>
                <ul>
                    <li>
                        <button onClick={() => dispatch(setSearchType(SEARCH.USER))}>User</button>
                    </li>
                    <li>
                        <button onClick={() => dispatch(setSearchType(SEARCH.CHANNEL))}>Channel</button>
                    </li>
                    <li>
                        <button onClick={() => dispatch(setSearchType(SEARCH.BLOCK))}>Block</button>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default SearchSelection;