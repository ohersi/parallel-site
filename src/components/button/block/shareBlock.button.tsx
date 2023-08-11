"use client";
// Packages
import { useState } from "react";
// Imports
import styles from "@/styles/components/button.module.scss";

interface IShareBlockButton {
    url: string;
}

const ShareBlockButton = ({ url }: IShareBlockButton) => {

    const [copied, setCopied] = useState<boolean>(false);

    const handleClick = () => {
        navigator.clipboard
            .writeText(url)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 4000);
            })
            .catch((error: any) => console.log(error));
    };

    return (
        <button
            className={styles.button}
            onClick={handleClick}>
            {
                copied ?
                    <span>copied!</span>
                    : <span>share</span>
            }
        </button>
    )
};

export default ShareBlockButton;