"use client";

// Imports
import styles from "@/styles/components/button.module.scss";

interface IDownloadBlockButton {
    url: string;
}

const DownloadBlockButton = ({ url }: IDownloadBlockButton) => {

    return (
        <a href={url} rel="noopener noreferrer">
            <div className={styles.button}>
                download
            </div>
        </a>
    )
};

export default DownloadBlockButton;