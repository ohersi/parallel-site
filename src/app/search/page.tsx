"use client";
// Packages
import useSWRMutation from "swr/mutation";
// Imports
import { useAppSelector } from "@/store";
import { searchUsers } from "@/resources/data/user/searchUsers";
import { searchChannels } from "@/resources/data/channel/searchChannels";
import { searchBlocks } from "@/resources/data/block/searchBlocks";
import SearchSelection from "@/components/search/selection.search";
import SearchField from "@/components/search/field.search";
import BlockGrid from "@/components/block/grid.blocks";
import ChannelGrid from "@/components/channel/grid.channel";
import UserGrid from "@/components/user/grid.user";
import { SEARCH } from "@/utils/types/types";

const SearchPage = () => {

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
        }
        else if (searchType === SEARCH.CHANNEL) {
            await getChannels()
        }
        else if (searchType === SEARCH.BLOCK) {
            await getBlocks()
        }
    };

    // console.log(`users: ${users?.success} + channels ${channels?.success} + blocks ${blocks?.success}`);

    return (
        <>
            <div>SEARCH COMPONENT</div>
            <SearchSelection />
            <SearchField handleClick={handleClick} />
            <div>
                {
                    users && !userError ?
                        <div>
                            {
                                users.map((user) => (
                                    <UserGrid user={user} key={user.id}/>
                                ))
                            }
                        </div>
                        : channels && !channelError ?
                            <div>
                                {
                                    channels.map((channel: any) => (
                                        <ChannelGrid props={channel} key={channel.channel.id}/>
                                    ))
                                }
                            </div>
                            : blocks && !blockError ? 
                            <div>
                                {
                                    blocks.map((block) => (
                                        <BlockGrid block={block} key={block.id} />
                                    ))
                                }
                            </div>
                                : null
                }
            </div>
        </>
    )
};

export default SearchPage;