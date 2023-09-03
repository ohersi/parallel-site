'use client';
// Imports
import ErrorComponent from "@/components/error/error";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <ErrorComponent error={error} reset={reset} />
            </body>
        </html>
    )
};