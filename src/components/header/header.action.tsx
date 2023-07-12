"use client";
// Imports
import { useAppSelector } from '@/store';
import EditChannelButton from '@/components/button/channel/editChannel.button';
import UserFollowMergedButton from '@/components/button/user/userFollowsMerged.button';
import ChannelFollowMergedButton from '@/components/button/channel/channelFollowsMerged.button';
import styles from '@/styles/components/button.module.scss';
import Link from 'next/link';

interface IHeaderAction {
    channelUser?: any; // user from channel page
    userID?: number | null | undefined;  // user id from user page
}

// TODO: Fix flicker for follow buttons when componenting is first loaded

const HeaderAction = ({ channelUser, userID }: IHeaderAction) => {

    const loggedInUser = useAppSelector((state) => state.User.user);

    let loggedInUserID: number | null = null;

    if (loggedInUser) loggedInUserID = loggedInUser.id;
    if (!userID) userID = null;

    return (
        <>
            {
                loggedInUser && channelUser && channelUser.id == loggedInUser.id ?

                    <EditChannelButton />

                    : loggedInUser && channelUser && channelUser.id !== loggedInUser.id ?

                        <ChannelFollowMergedButton channelID={channelUser.id} loggedInUserID={loggedInUserID} />

                        : loggedInUser && userID && loggedInUser.id !== userID ?

                            <UserFollowMergedButton userID={userID} loggedInUserID={loggedInUserID} />

                            : loggedInUser && userID && loggedInUser.id == userID ?

                                <Link href={'/settings'}>
                                    <div className={styles.button}>settings</div>
                                </Link>

                                : null
            }
        </>
    )
};

export default HeaderAction;
