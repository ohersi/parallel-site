"use client";
// Packages
import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';
import axios from 'axios';
import useSWR from "swr";
// REDUX
import { useAppDispatch, useAppSelector } from '@/store';
import { setFormType } from '@/store/formTypeSlice';
import { setIsOpen } from '@/store/isModalOpenSlice';
import { setIsBlockModalOpen } from '@/store/isModalOpenSlice';
import { setButtonType } from '@/store/buttonTypeSlice';
import { setBlockClicked } from '@/store/blockClickedSlice';
// COMPONENTS
import Modal from '@/components/modal/modal';
import EditBlockButton from '@/components/button/block/editBlock.button';
import ConnectBlockButton from '@/components/button/block/connectBlock.button';
import DownloadBlockButton from '@/components/button/block/downloadBlock.button';
import ShareBlockButton from '@/components/button/block/shareBlock.button';
import ConnectionBlock from '@/components/block/connection.block';
import UpdateBlockForm from '@/components/form/updateBlock.form';
// FUNCTIONS
import { timeAgo } from '@/resources/timeAgo';
// TYPES
import { BUTTON, FORM, IBlock, IChannel } from '@/utils/types/types';
// STYLES
import styles from '@/styles/components/block/block.module.scss';

interface BlockProps {
    block: IBlock;
    pathname?: string;
    replaceURL?: (newURL: string) => void;
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

const Block = ({ block, pathname, replaceURL }: BlockProps) => {

    const { data, error } = useSWR(`${block.id}`, getBlockData);

    const dispatch = useAppDispatch();
    const loggedInUser = useAppSelector((state) => state.User.user);
    const formType = useAppSelector((state) => state.Form.formType);
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const blockModalOpen = useAppSelector((state) => state.Modal.isBlockModalOpen);
    const buttonType = useAppSelector((state) => state.Button.buttonType);
    const blockClicked = useAppSelector((state) => state.Block.blockClicked);

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
                    <div className={styles.block} key={block.id}>
                        <div className={styles.block__image_container} />

                        <div className={styles.block__info}>
                            {
                                replaceURL && pathname ?
                                    <div className={styles.block__info__close_btn}>
                                        <svg
                                            onClick={() => {
                                                dispatch(setIsOpen(!isOpen));
                                                dispatch(setBlockClicked(undefined));
                                                dispatch(setIsBlockModalOpen(!blockModalOpen));
                                                replaceURL(pathname);
                                            }}
                                            xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 15" fill="none">
                                            <line x1="1.96612" y1="0.427971" x2="16.0827" y2="14.5446" stroke="currentColor" />
                                            <line x1="1.25901" y1="14.5445" x2="15.3756" y2="0.427954" stroke="currentColor" />
                                        </svg>
                                    </div> : null
                            }

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
                                <ConnectBlockButton blockID={block.id} />
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
                        <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)); dispatch(setButtonType('')); dispatch(setBlockClicked(undefined)); }} isOpen={isOpen}>
                            <ConnectionBlock blockID={block.id} />
                        </Modal>
                        : null
                }
            </>
        </>
    )
};

export default Block;