"use client";
// Packages
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image'
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
import ErrorBlock from '@/components/block/error.block';
import LoadingBlock from '@/components/block/loading.block';
import UpdateBlockForm from '@/components/form/updateBlock.form';
import ConnectionBlock from '@/components/block/connection.block';
import EditBlockButton from '@/components/button/block/editBlock.button';
import ConnectBlockButton from '@/components/button/block/connectBlock.button';
import DownloadBlockButton from '@/components/button/block/downloadBlock.button';
import SearchBlockButton from '@/components/button/block/searchBlock.button';
import ShareBlockButton from '@/components/button/block/shareBlock.button';
// FUNCTIONS
import { resize } from '@/resources/resize';
import { timeAgo } from '@/resources/timeAgo';
import { getBlockData } from '@/resources/data/block/getBlockData';
// TYPES
import { BUTTON, FORM, IBlock, IChannel, IUser } from '@/utils/types/types';
// STYLES
import styles from '@/styles/components/block/block.module.scss';

interface BlockProps {
    block: IBlock;
    pathname?: string;
    replaceURL?: (newURL: string) => void;
}

const Block = ({ block, pathname, replaceURL }: BlockProps) => {

    const sidebarRef = useRef<HTMLDivElement>(null);
    const resizerRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);

    const { data, error, mutate } = useSWR(`api/v1/blocks/${block.id}`, () => getBlockData(block.id));

    const dispatch = useAppDispatch();
    const loggedInUser = useAppSelector((state) => state.User.user);
    const formType = useAppSelector((state) => state.Form.formType);
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const blockModalOpen = useAppSelector((state) => state.Modal.isBlockModalOpen);
    const buttonType = useAppSelector((state) => state.Button.buttonType);
    const blockClicked = useAppSelector((state) => state.Block.blockClicked);

    // Initalize resizable divs once data is loaded
    useEffect(() => {
        if (sidebarRef.current && resizerRef.current && infoRef.current) {
            resize(sidebarRef.current, resizerRef.current, infoRef.current);
        }
    }, [data]);

    if (error) return <ErrorBlock replaceURL={replaceURL} pathname={pathname} mutate={mutate} />
    if (!data) return <LoadingBlock replaceURL={replaceURL} pathname={pathname} />

    const blocks = data;

    let connections = blocks.channels.length;

    return (
        <>
            <div className={replaceURL && pathname ? styles.modal_block : styles.block} key={block.id}>
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

                <div ref={sidebarRef} className={styles.block__image_wrapper}>
                    <div className={styles.block__image_wrapper__image}>
                        <div className={styles.block__image_wrapper__image__img}>
                            <Image
                                alt='test'
                                src={block.image_url}
                                fill
                                sizes='100vw'
                                style={{
                                    objectFit: 'contain',
                                    maxWidth: '715px',
                                    maxHeight: '715px',
                                    margin: "0 auto",
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div ref={resizerRef} className={styles.block__resize}></div>

                <div ref={infoRef} className={styles.block__info}>
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
                        <span>
                            <Link href={blocks.source_url}>Source</Link>
                        </span>
                    </div>

                    <div className={styles.block__info__links}>
                        <span className={styles.block__info__links__title}>Actions</span>
                        <div className={styles.block__info__links__buttons}>
                            <ShareBlockButton url={blocks.image_url} />
                            <DownloadBlockButton url={blocks.source_url} />
                            <SearchBlockButton url={blocks.image_url} />
                        </div>
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
                            blocks.channels.map((channel: IChannel) => {
                                let channelUser = channel.user as IUser | undefined;
                                return <Link href={`${channelUser?.slug}/${channel.slug}`} key={channel.slug}>
                                    <div className={styles.block__info__connections__item}>
                                        <div className={styles.block__info__connections__item__title}>
                                            {channel.title}
                                        </div>
                                        <div className={styles.block__info__connections__item__user}>
                                            by {channelUser?.full_name}
                                        </div>
                                    </div>
                                </Link>
                            })
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