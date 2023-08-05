"use client";
// Imports
import { useAppDispatch, useAppSelector } from "@/store";
import { setSearch } from "@/store/searchSlice";
import styles from "@/styles/components/search/field.search.module.scss";

interface ISearchField {
    handleClick: () => Promise<void>
}

const SearchField = ({ handleClick }: ISearchField) => {

    const dispatch = useAppDispatch();
    const search = useAppSelector((state) => state.Search.search);
    const searchType = useAppSelector((state) => state.Search.searchType);

    const handleKeyDown = (key: string) => {
        if (key == 'Enter') {
            handleClick();
        }
    };

    return (
        <div className={styles.field}>
            <div className={styles.field__search}>
                <div className={styles.field__search__type}>{searchType}</div>
                <input
                    className={styles.field__search__input}
                    type="search"
                    value={search}
                    onChange={(e) => dispatch(setSearch(e.target.value))}
                    onKeyDown={(e) => handleKeyDown(e.key)}
                    placeholder="Search for..."
                />
                <div className={styles.field__search__icon}>
                    <svg
                        className={styles.field__search__icon__svg}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.92197 1.64378C11.342 1.64378 14.1145 4.41627 14.1145 7.8363C14.1145 11.2563 11.342 14.0288 7.92197 14.0288C4.50193 14.0288 1.72945 11.2563 1.72945 7.8363C1.72945 4.41627 4.50193 1.64378 7.92197 1.64378ZM7.92197 0.643784C11.8943 0.643784 15.1145 3.86398 15.1145 7.8363C15.1145 9.64251 14.4487 11.2932 13.3492 12.5564L17.6382 16.8454C17.8335 17.0407 17.8335 17.3573 17.6382 17.5525C17.4429 17.7478 17.1264 17.7478 16.9311 17.5525L12.6421 13.2635C11.3789 14.363 9.72818 15.0288 7.92197 15.0288C3.94965 15.0288 0.729449 11.8086 0.729449 7.8363C0.729449 3.86398 3.94965 0.643784 7.92197 0.643784Z" />
                    </svg>
                </div>
            </div>
        </div>
    )
};

export default SearchField;