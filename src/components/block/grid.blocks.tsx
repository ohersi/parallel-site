"use client";
// Packages
import { usePathname } from 'next/navigation';
// REDUX
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/isModalOpenSlice';
import { setButtonType } from '@/store/buttonTypeSlice';
import { setBlockClicked } from '@/store/blockClickedSlice';
// COMPONENTS
import Block from '@/components/block/block';
import Modal from '@/components/modal/modal';
import ConnectionBlock from '@/components/block/connection.block';
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
};

const BlockGrid = ({ block, channelID, channelUser }: IBlockGrid) => {

    const pathname = usePathname();

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.User.user);
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
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

    return (
        <>
            <div
                className={styles.channel__blocks}
                onClick={() => {
                    dispatch(setIsOpen(!isOpen));
                    dispatch(setBlockClicked(block.id))
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
                    <div className={styles.channel__blocks__info__title}>
                        <p>#{block.id} - {block.title}</p>
                    </div>
                    <div className={styles.channel__blocks__info__metadata}>
                        <p>Connected by {channelUser}</p>
                    </div>
                </div>
            </div>

            <>
                {
                    isOpen && blockClicked == block.id && !buttonType ?
                        <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)); dispatch(setBlockClicked(undefined)); replaceURL(pathname); }} isOpen={isOpen} >
                            <Block block={block} replaceURL={replaceURL} pathname={pathname} />
                        </Modal>
                        : null
                }
            </>
            <>
                {
                    isOpen && blockClicked == block.id && buttonType == BUTTON.BLOCK_CONNECTION_CREATE ?
                        <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)); dispatch(setButtonType('')); dispatch(setBlockClicked(undefined)); }} isOpen={isOpen}>
                            <button onClick={() => { dispatch(setIsOpen(!isOpen)); dispatch(setButtonType('')); dispatch(setBlockClicked(undefined)); }}>Close</button>
                            <ConnectionBlock blockID={block.id} />
                        </Modal>
                        : null
                }
            </>
            <>
                {
                    isOpen && channelID && blockClicked == block.id && buttonType == BUTTON.BLOCK_CONNECTION_DELETE ?
                        <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)); dispatch(setButtonType('')); dispatch(setBlockClicked(undefined)); }} isOpen={isOpen}>
                            <button onClick={() => { dispatch(setIsOpen(!isOpen)); dispatch(setButtonType('')); dispatch(setBlockClicked(undefined)); }}>Close</button>
                            <RemoveConnectionBlock blockID={block.id} channelID={channelID} />
                        </Modal>
                        : null
                }
            </>
        </>
    )
};

export default BlockGrid;