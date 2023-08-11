// Packages
import { cookies } from 'next/headers';
import { Metadata } from 'next';
// Imports
import Header from '@/components/header/header';
import HeaderTitle from '@/components/header/title.header';
import UserFeed from '@/components/feed/user.feed';
import { AuthRequiredException } from '@/lib/exceptions/auth.exception';
import styles from '@/styles/pages/feed.page.module.scss';

export const metadata: Metadata = {
    title: 'Feed',
    description: 'Feed Page',
}

const FeedPage = async () => {

    const cookieStore = cookies();
    const session = cookieStore.has(process.env.SESSION_ID!);

    if (!session) throw new AuthRequiredException();

    return (
        <div className={styles.page}>
            <Header title={<HeaderTitle props={'Feed'} />} />
            <UserFeed />
        </div>
    )
};

export default FeedPage;