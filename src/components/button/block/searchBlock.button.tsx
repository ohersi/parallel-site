"use client";
// Imports
import styles from "@/styles/components/button.module.scss";

interface ISearchBlockButton {
    url: string;
}

const SearchBlockButton = ({ url }: ISearchBlockButton) => {

    return (
        <a href={`https://lens.google.com/uploadbyurl?url=${url}`} rel="noopener noreferrer" target="_blank">
            <div className={styles.button}>
                search image
            </div>
        </a>
    )
};

export default SearchBlockButton;