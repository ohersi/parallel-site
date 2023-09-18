"use client";
// Packages
import { useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
// REDUX
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/modalSlice';
import { setIsBlockModalOpen } from '@/store/modalSlice';
import { setButtonType } from '@/store/buttonTypeSlice';
import { setBlockClicked } from '@/store/blockClickedSlice';
// COMPONENTS
import Block from '@/components/block/block';
import Modal from '@/components/modal/modal';
import RemoveConnectionBlock from '@/components/block/removeConnection.block';
import ConnectBlockButton from '@/components/button/block/connectBlock.button';
import DisconnectBlockButton from '@/components/button/block/disconnectBlock.button';
// TYPES
import { BUTTON, IBlock, IUser } from "@/utils/types/types";
// STYLES
import styles from "@/styles/components/channel.module.scss";

interface IBlockGrid {
    block: IBlock;
    channelID?: number;
    channelUserID?: number | undefined;
    channelUserName?: string;
    channelTitle?: string;
};

const BlockGrid = ({ block, channelID, channelUserID, channelUserName, channelTitle }: IBlockGrid) => {

    const pathname = usePathname();

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.User.user);
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const blockModalOpen = useAppSelector((state) => state.Modal.isBlockModalOpen);
    const buttonType = useAppSelector((state) => state.Button.buttonType);
    const blockClicked = useAppSelector((state) => state.Block.blockClicked);

    const findID = (block: IBlock) => {
        for (const channel of block.channels) {
            let channelUser = channel.user as IUser;
            if (user && channelUser.id === user.id) return channelUser.id;
        }
    };

    const checkBlockAndChannelOwnerConnection = channelUserID ? channelUserID : findID(block); 

    const replaceURL = (newURL: string) => {
        window.history.replaceState({
            as: newURL,
            url: newURL
        },
            '',
            newURL);
    };

    useEffect(() => {
        return (): void => {
            dispatch(setIsOpen(false));
            dispatch(setIsBlockModalOpen(false));
        }
    }, [])

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5
    })

    return (
        <>
            <div
                className={styles.channel__blocks}
                onClick={() => {
                    dispatch(setIsOpen(!isOpen));
                    dispatch(setBlockClicked(block.id))
                    dispatch(setIsBlockModalOpen(!blockModalOpen));
                    replaceURL(`/block/${block.id}`);
                }}
            >
                <div className={styles.channel__blocks__image}>
                    <div className={styles.channel__blocks__image__overlay}>
                        {
                            user && checkBlockAndChannelOwnerConnection ?
                                <DisconnectBlockButton blockID={block.id} />
                                : <ConnectBlockButton blockID={block.id} />
                        }
                    </div>
                    <div ref={ref} className={styles.channel__blocks__image_img}>
                        <Image
                            alt='test'
                            src={block.image_url}
                            fill
                            sizes='100vw'
                            style={{
                                objectFit: 'contain',
                                maxWidth: '315px',
                                maxHeight: '315px',
                                margin: "0 auto",
                                opacity: inView ? 1 : 0,
                                transition: 'opacity 0.4s cubic-bezier(0.3, 0.2, 0.2, 0.8)'
                            }}
                        />
                    </div>
                </div>

                <div className={styles.channel__blocks__info}>
                    <div className={channelUserName ? styles.channel__blocks__info__title__hidden : styles.channel__blocks__info__title}>
                        {block.title}
                    </div>
                    {
                        channelUserName ?
                            <div className={styles.channel__blocks__info__metadata}>
                                Connected by {channelUserName}
                            </div>
                            : null
                    }
                </div>
            </div>

            <>
                {
                    isOpen && blockClicked == block.id && buttonType !== BUTTON.BLOCK_CONNECTION_DELETE ?
                        <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)); dispatch(setBlockClicked(undefined)); replaceURL(pathname); }} isOpen={isOpen} >
                            <Block
                                block={block}
                                pathname={pathname}
                                replaceURL={replaceURL}
                            />
                        </Modal>
                        : null
                }
            </>
            <>
                {
                    isOpen && channelID && channelTitle && blockClicked == block.id && buttonType == BUTTON.BLOCK_CONNECTION_DELETE ?
                        <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)); dispatch(setButtonType('')); dispatch(setBlockClicked(undefined)); dispatch(setIsBlockModalOpen(false)); replaceURL(pathname); }} isOpen={isOpen}>
                            <RemoveConnectionBlock
                                blockID={block.id}
                                blockTitle={block.title}
                                channelID={channelID}
                                channelTitle={channelTitle}
                                pathname={pathname}
                                replaceURL={replaceURL}
                            />
                        </Modal>
                        : null
                }
            </>
        </>
    )
};

export default BlockGrid;