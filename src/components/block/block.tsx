"use client";
// Packages
import axios from 'axios';
import useSWR from "swr";
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setFormType } from '@/store/formTypeSlice';
import EditBlockButton from '@/components/button/block/editBlock.button';
import UpdateBlockForm from '@/components/form/updateBlock.form';
import { FORM, IBlock, IChannel } from '@/utils/types/types';
import { timeAgo } from '@/resources/timeAgo';

interface BlockProps {
    block: IBlock;
}

async function getBlockData(id: number) {

    const res = await axios.get(`http://localhost:3000/api/v1/blocks/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
        }
    });

    console.log('data fetched');

    const data = await res.data as IBlock;

    return data;
}

const Block = ({ block }: BlockProps) => {

    const { data, error } = useSWR(`${block.id}`, getBlockData);

    const dispatch = useAppDispatch();
    const loggedInUser = useAppSelector((state) => state.User.user);
    const formType = useAppSelector((state) => state.Form.formType);

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>;

    const blocks = data;
    console.log(blocks);

    return (
        <>
            {
                formType && formType == FORM.BLOCK_UPDATE ?
                    <div>
                        <button onClick={() => { dispatch(setFormType('')); }} >X</button>
                        <UpdateBlockForm block={block} />
                    </div>

                    :
                    <div key={block.id}>
                        <h1>{blocks.title}</h1>
                        <h3>{blocks.description}</h3>
                        <h3>{blocks.source_url}</h3>
                        <h3>{blocks.image_url}</h3>
                        <h4>
                            <time dateTime={blocks.date_updated} title={blocks.date_updated}>
                                Last updated {timeAgo(blocks.date_updated)}
                            </time>
                        </h4>
                        <h5>
                            {
                                blocks.channels.map((channel: IChannel) => (
                                    <div key={channel.slug}>
                                        <div>CHANNEL - {channel.title}</div>
                                    </div>
                                ))
                            }
                        </h5>
                        {
                            loggedInUser && block.user == loggedInUser.id ?
                                <EditBlockButton />
                                : null
                        }
                    </div>
            }
        </>
    )
};

export default Block;