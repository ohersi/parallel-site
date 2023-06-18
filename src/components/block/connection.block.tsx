"use client";
// Packages
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
// Imports
import { useAppSelector } from "@/store";
import { GetUserChannels } from "@/resources/data/channel/getUserChannels";
import { ConnectBlock } from "@/resources/data/block/connectBlock";
import { ISearchResults } from "@/utils/types/types";

interface IConnectionBlock {
    blockID: number;
}

const ConnectionBlock = ({ blockID }: IConnectionBlock) => {

    // TODO: Create search field, filter user channels

    const [search, setSearch] = useState<string>('');

    let channelClicked: number | undefined;

    const user = useAppSelector((state) => state.User.user);

    const { data } = useSWR(user ? `/api/v1/users/${user.id}/channels` : null, () => user ? GetUserChannels(user.id) : () => { });

    const { trigger, error: error } = useSWRMutation(`api/v1/blocks/${blockID}/connect?channel=${channelClicked}`, () => ConnectBlock(blockID, channelClicked));

    const arr = data ? data.data : null;

    const handleClick = async (channelID: number) => {

        channelClicked = channelID;

        await trigger().then((success) => {
            if (success) {
                // TODO: Disable connect if success replace with checkmark
            }
            channelClicked = undefined
        });
    }

    return (
        <>
            <div>CONNECTION BLOCK {blockID}</div>
            <div>
                <input type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div>Search Input: {search}</div>
            {
                arr && !error ?
                    arr.filter((res: ISearchResults) => (
                        search.toLowerCase() === '' ? res :
                            res.channel.title.toLowerCase().includes(search.toLowerCase())
                    ))
                        .map((res: ISearchResults) => (
                            <div key={res.channel.title}>
                                <h4>{res.channel.title}</h4>
                                <button onClick={() => handleClick(res.channel.id)}>Connect</button>
                            </div>
                        ))
                    : null
            }
        </>
    )
};

export default ConnectionBlock;