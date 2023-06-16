"use client";
// Packages
import useSWR from "swr";
// Imports
import { useAppSelector } from "@/store";
import { GetUserChannels } from "@/resources/data/channel/getUserChannels";

interface IConnectionBlock {
    blockID: number;
}

const ConnectionBlock = ({ blockID }: IConnectionBlock) => {

    const user = useAppSelector((state) => state.User.user);

    const { data, error: error } = useSWR(user ? `/api/v1/users/${user.id}/channels` : null, () => user ? GetUserChannels(user.id) : () => { });

    const arr = data ? data.data : null;

    return (
        <>
            <div>CONNECTION BLOCK {blockID}</div>
            {
                arr && !error ?
                    arr.map((res: any) => (
                        <div key={res.channel.title}>
                            <h4>{res.channel.title}</h4>
                        </div>
                    ))
                    : null
            }
        </>
    )
}

export default ConnectionBlock;