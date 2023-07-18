"use client";
// Imports
import { useAppDispatch } from "@/store";
import { setSearchType } from "@/store/searchSlice";
import { SEARCH } from "@/utils/types/types";
import styles from "@/styles/components/search/selection.search.module.scss";

const SearchSelection = () => {

    const dispatch = useAppDispatch();

    return (
        <div className={styles.selection}>
            <div className={styles.selection__title}>TYPES</div>

            <div className={styles.selection__buttons}>

                <button
                    className={styles.selection__buttons__btn}
                    onClick={() => dispatch(setSearchType(SEARCH.USER))}>
                    user
                </button>

                <button
                    className={styles.selection__buttons__btn}
                    onClick={() => dispatch(setSearchType(SEARCH.CHANNEL))}>
                    channel
                </button>

                <button
                    className={styles.selection__buttons__btn}
                    onClick={() => dispatch(setSearchType(SEARCH.BLOCK))}>
                    block
                </button>

            </div>
        </div>

    )
}

export default SearchSelection;