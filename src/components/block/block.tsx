"use client";
// Packages
import Link from 'next/link';
import axios from 'axios';
import useSWR from "swr";
// REDUX
import { useAppDispatch, useAppSelector } from '@/store';
import { setFormType } from '@/store/formTypeSlice';
import { setIsOpen } from '@/store/modalSlice';
import { setIsBlockModalOpen } from '@/store/modalSlice';
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
            <div className={styles.block} key={block.id}>
                {
                    replaceURL && pathname ?
                        <div className={styles.block__close}>
                            <button className={styles.block__close__btn}>
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
                            </button>
                        </div> : null
                }

                <div className={styles.block__image_container} />

                <div className={styles.block__info}>
                    {
                        replaceURL && pathname ?
                            <div className={styles.block__info__close}>
                                <button className={styles.block__info__close__btn}>
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
                                </button>
                            </div> : null
                    }

                    <div className={styles.block__info__text}>
                        <span className={styles.block__info__text__title}>{blocks.title}</span>
                        <p className={styles.block__info__text__description}>{blocks.description}</p>
                    </div>

                    <div className={styles.block__info__metadata}>
                        <time dateTime={blocks.date_created} title={blocks.date_created}>
                            Added {timeAgo(blocks.date_created)}
                        </time>
                        <time dateTime={blocks.date_updated} title={blocks.date_updated}>
                            Last updated {timeAgo(blocks.date_updated)}
                        </time>
                        <Link href={blocks.source_url}>Source</Link>
                    </div>

                    <div className={styles.block__info__links}>
                        <span className={styles.block__info__links__title}>Actions</span>
                        <span>Share</span>
                        <span>Download</span>
                    </div>

                    {
                        loggedInUser && block.user == loggedInUser.id ?
                            <EditBlockButton blockID={block.id} />
                            : null
                    }

                    <div className={styles.block__info__connections}>

                        <span className={styles.block__info__description}>{connections > 1 ? `${connections} CONNECTIONS` : `${connections} CONNECTION`} </span>

                        <div className={styles.block__info__connections__btn}>
                            <ConnectBlockButton blockID={block.id} />
                        </div>

                        {
                            blocks.channels.map((channel: IChannel) => (
                                <div className={styles.block__info__connections__item} key={channel.slug}>
                                    <div className={styles.block__info__connections__item__title}>
                                        {channel.title}
                                    </div>
                                    <div className={styles.block__info__connections__item__user}>
                                        by {channel.user?.full_name}
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
            <>
                {
                    isOpen && blockClicked == block.id && formType && formType == FORM.BLOCK_UPDATE ?
                        <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)); dispatch(setFormType('')); dispatch(setBlockClicked(undefined)); }} isOpen={isOpen}>
                            <UpdateBlockForm block={block} />
                        </Modal>

                        : null
                }
            </>
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