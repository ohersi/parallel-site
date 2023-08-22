'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {

    // error.message to avoid is omitted  in production builds to avoid leaking sensitive details.
    
    return (
        <div>
            <h2>Something went wrong!</h2>
            <h4>{error.name}</h4>
            <h3>{error.message}</h3>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    );
};