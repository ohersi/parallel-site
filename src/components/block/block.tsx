"use client";
// Packages
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import useSWR from "swr";
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setFormType } from '@/store/formTypeSlice';
import { setIsOpen } from '@/store/isModalOpenSlice';
import { setButtonType } from '@/store/buttonTypeSlice';
import EditBlockButton from '@/components/button/block/editBlock.button';
import ConnectBlockButton from '@/components/button/block/connectBlock.button';
import DownloadBlockButton from '@/components/button/block/downloadBlock.button';
import ShareBlockButton from '@/components/button/block/shareBlock.button';
import ConnectionBlock from '@/components/block/connection.block';
import UpdateBlockForm from '@/components/form/updateBlock.form';
import Modal from '@/components/modal/modal';
import { BUTTON, FORM, IBlock, IChannel } from '@/utils/types/types';
import { timeAgo } from '@/resources/timeAgo';
import styles from '@/styles/components/block/block.module.scss';

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

    const [blockClicked, setBlockClicked] = useState<number>();

    const dispatch = useAppDispatch();
    const loggedInUser = useAppSelector((state) => state.User.user);
    const formType = useAppSelector((state) => state.Form.formType);
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const buttonType = useAppSelector((state) => state.Button.buttonType);

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>;

    const blocks = data;
    // console.log(blocks);
    let connections = blocks.channels.length;

    return (
        <>
            {
                formType && formType == FORM.BLOCK_UPDATE ?
                    <div>
                        <button onClick={() => { dispatch(setFormType('')); }} >X</button>
                        <UpdateBlockForm block={block} />
                    </div>
                    :
                    <div
                        className={styles.block}
                        key={block.id}
                    >
                        <div className={styles.block__image_container} />

                        <div className={styles.block__info}>

                            <h1>{blocks.title}</h1>

                            <p className={styles.block__info__description}>{blocks.description}</p>

                            <p>
                                <time dateTime={blocks.date_created} title={blocks.date_created}>
                                    Added {timeAgo(blocks.date_created)}
                                </time>
                            </p>

                            <p>
                                <time dateTime={blocks.date_updated} title={blocks.date_updated}>
                                    Last updated {timeAgo(blocks.date_updated)}
                                </time>
                            </p>

                            <p>
                                <Link href={blocks.source_url}>Source</Link>
                            </p>

                            <div className={styles.block__info__buttons}>
                                {
                                    loggedInUser && block.user == loggedInUser.id ?
                                        <EditBlockButton />
                                        : null
                                }
                                <ConnectBlockButton blockID={block.id} setBlockClicked={setBlockClicked} />
                                <DownloadBlockButton />
                                <ShareBlockButton url={blocks.source_url} />
                            </div>

                            <div className={styles.block__info__connections}>

                                <span className={styles.block__info__description}>{connections > 1 ? `${connections} CONNECTIONS` : `${connections} CONNECTION`} </span>

                                <div className={styles.block__info__connections__item}>
                                    <h5>
                                        {
                                            blocks.channels.map((channel: IChannel) => (
                                                <div key={channel.slug}>
                                                    <div>CHANNEL - {channel.title}</div>
                                                </div>
                                            ))
                                        }
                                    </h5>
                                </div>
                            </div>

                        </div>
                    </div>
            }
            <>
                {
                    isOpen && blockClicked == block.id && buttonType == BUTTON.BLOCK_CONNECTION_CREATE ?
                        <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)); dispatch(setButtonType('')); setBlockClicked(undefined); }} isOpen={isOpen}>
                            <ConnectionBlock blockID={block.id} setBlockClicked={setBlockClicked} />
                        </Modal>
                        : null
                }
            </>
        </>
    )
};

export default Block;