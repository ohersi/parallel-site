'use client';
// Imports
import ErrorComponent from "@/components/error/error";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {

    return (
        <ErrorComponent error={error} reset={reset} />
    )
};

export default Error;