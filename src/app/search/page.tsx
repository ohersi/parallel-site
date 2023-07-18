"use client";
// Packages
import { useState } from "react";
import useSWRMutation from "swr/mutation";
// REDUX
import { useAppSelector } from "@/store";
// COMPONENTS
import SearchSelection from "@/components/search/selection.search";
import SearchField from "@/components/search/field.search";
import BlockGrid from "@/components/block/grid.blocks";
import ChannelGrid from "@/components/channel/grid.channel";
import UserGrid from "@/components/user/grid.user";
// FUNCTIONS
import { searchUsers } from "@/resources/data/user/searchUsers";
import { searchChannels } from "@/resources/data/channel/searchChannels";
import { searchBlocks } from "@/resources/data/block/searchBlocks";
// TYPES
import { SEARCH } from "@/utils/types/types";
// STYLES
import styles from '@/styles/pages/search.page.module.scss';

const SearchPage = () => {

    const [visible, setVisible] = useState<boolean>(false);

    const search = useAppSelector((state) => state.Search.search);
    const searchType = useAppSelector((state) => state.Search.searchType);

    const { data: users, trigger: getUsers, error: userError, reset: userReset } = useSWRMutation(`api/v1/search/users?name=${search}`, () => searchUsers(search));

    const { data: channels, trigger: getChannels, error: channelError, reset: channelReset } = useSWRMutation(`api/v1/search/channels?title=${search}`, () => searchChannels(search));

    const { data: blocks, trigger: getBlocks, error: blockError, reset: blockReset } = useSWRMutation(`api/v1/search/blocks?title=${search}`, () => searchBlocks(search));

    const handleClick = async () => {

        userReset();
        channelReset();
        blockReset();

        if (!search) return;

        if (searchType === SEARCH.USER) {
            await getUsers()
                .catch((error: any) => console.log(error));
        }
        else if (searchType === SEARCH.CHANNEL) {
            await getChannels()
                .catch((error: any) => console.log(error));
        }
        else if (searchType === SEARCH.BLOCK) {
            await getBlocks()
                .catch((error: any) => console.log(error));
        }
    };

    // console.log(`users: ${users?.success} + channels ${channels?.success} + blocks ${blocks?.success}`);

    return (
        <div className={styles.page}>

            <SearchField handleClick={handleClick} />

            <button
                className={styles.page__filter}
                onClick={() => setVisible((prev) => !prev)}>
                Filters
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="6" viewBox="0 0 11 6" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.58797 0.196663C1.39271 0.00140114 1.07613 0.00140114 0.880867 0.196663C0.685605 0.391925 0.685605 0.708508 0.880867 0.90377L5.18408 5.20698C5.20849 5.23139 5.23479 5.25275 5.26252 5.27105C5.29125 5.29003 5.32151 5.30572 5.35278 5.31814C5.53266 5.3896 5.74563 5.35255 5.89119 5.20699L10.1944 0.903776C10.3897 0.708514 10.3897 0.391932 10.1944 0.19667C9.99914 0.0014075 9.68256 0.00140769 9.4873 0.19667L5.53764 4.14633L1.58797 0.196663Z" fill="#215BDF" />
                </svg>
            </button>
            {
                visible ?
                    <SearchSelection />
                    : null
            }
            <div className={styles.page__results}>
                {
                    users || channels || blocks ?
                        <div className={styles.page__results__text}>
                            {users?.length || channels?.length || blocks?.length} RESULTS FOR [{searchType}] `{search}`
                        </div>
                        : userError || channelError || blockError ?
                            <div className={styles.page__results__text}>
                                No results for {search}
                            </div>
                            : null
                }
                {
                    users && !userError ?
                        <div className={styles.page__grid}>
                            {
                                users.map((user) => (
                                    <UserGrid user={user} key={user.id} />
                                ))
                            }
                        </div>
                        : channels && !channelError ?
                            <div className={styles.page__grid}>
                                {
                                    channels.map((channel: any) => (
                                        <ChannelGrid props={channel} key={channel.channel.id} />
                                    ))
                                }
                            </div>
                            : blocks && !blockError ?
                                <div className={styles.page__grid}>
                                    {
                                        blocks.map((block) => (
                                            <BlockGrid block={block} key={block.id} />
                                        ))
                                    }
                                </div>
                                : null
                }
            </div>
        </div>
    )
};

export default SearchPage;