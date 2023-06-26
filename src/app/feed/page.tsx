// Packages
import { cookies } from 'next/headers';
import { Metadata } from 'next';
// Imports
import UserFeed from '@/components/feed/user.feed';

export const metadata: Metadata = {
    title: 'Feed',
    description: 'Feed Page',
}

const FeedPage = async () => {

    const cookieStore = cookies();
    const session = cookieStore.has(process.env.SESSION_ID!);

    return (
        <>
            {
                session ?
                    <UserFeed />
                    : <div>Login required!</div>
            }
        </>
    )
};

export default FeedPage;