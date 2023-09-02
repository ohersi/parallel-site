// Packages
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCookies } from 'next-client-cookies/server';
// Imports
import Header from '@/components/header/header';
import HeaderTitle from '@/components/header/title.header';
import UserFeed from '@/components/feed/user.feed';
import styles from '@/styles/pages/feed.page.module.scss';

export const metadata: Metadata = {
    title: 'Feed',
    description: 'Feed Page',
}

const FeedPage = async () => {

    const cookieStore = getCookies();
    const session = cookieStore.get(process.env.NEXT_PUBLIC_SESSION_ID!);
    console.log(session);

    if (!session) redirect('/login');

    return (
        <div className={styles.page}>
            {
                session ?
                    <>
                        <Header title={<HeaderTitle props={'Feed'} />} />
                        <UserFeed />
                    </>
                    :
                    <div className={styles.page__error}>
                        Login required!
                    </div>
            }
        </div>
    )
};

export default FeedPage;