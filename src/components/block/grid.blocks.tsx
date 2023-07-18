"use client";
// Packages
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
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
import { BUTTON, IBlock } from "@/utils/types/types";
// STYLES
import styles from "@/styles/components/channel.module.scss";

interface IBlockGrid {
    block: IBlock;
    channelID?: number;
    channelUser?: string;
    channelTitle?: string;
};

const BlockGrid = ({ block, channelID, channelUser, channelTitle }: IBlockGrid) => {

    const pathname = usePathname();

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.User.user);
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const blockModalOpen = useAppSelector((state) => state.Modal.isBlockModalOpen);
    const buttonType = useAppSelector((state) => state.Button.buttonType);
    const blockClicked = useAppSelector((state) => state.Block.blockClicked);

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
                            user && user.id == block.user ?
                                <DisconnectBlockButton blockID={block.id} />
                                : <ConnectBlockButton blockID={block.id} />
                        }
                    </div>
                </div>

                <div className={styles.channel__blocks__info}>
                    <div className={channelUser ? styles.channel__blocks__info__title__hidden : styles.channel__blocks__info__title}>
                        #{block.id} - {block.title}
                    </div>
                    {
                        channelUser ?
                            <div className={styles.channel__blocks__info__metadata}>
                                Connected by {channelUser}
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