"use client";
// Packages
import { useState } from "react";
// Imports
import styles from "@/styles/components/button.module.scss";

interface IShareBlockButton {
    url: string;
}

const ShareBlockButton = ({ url }: IShareBlockButton) => {

    // TODO: Onclick copy url to clipboard & change share text to copied

    const [copied, setCopied] = useState<boolean>(false);

    const handleClick = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 4000);
    };

    return (
        <button
            className={styles.button}
            onClick={handleClick}>share
        </button>
    )
};

export default ShareBlockButton;