"use client";
// Packages
import { useState } from 'react';
import { usePathname } from 'next/navigation';
// Imports
import Block from '@/components/block/block';
import Modal from '@/components/modal/modal';
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/isModalOpenSlice';
import { setButtonType } from '@/store/buttonTypeSlice';
import ConnectionBlock from '@/components/block/connection.block';
import RemoveConnectionBlock from '@/components/block/removeConnection.block';
import ConnectBlockButton from '@/components/button/block/connectBlock.button';
import DisconnectBlockButton from '@/components/button/block/disconnectBlock.button';
import { BUTTON, IBlock } from "@/utils/types/types";
import styles from "@/styles/components/channel.module.scss";

interface IBlockGrid {
    block: IBlock;
    channelID?: number;
};

const BlockGrid = ({ block, channelID }: IBlockGrid) => {

    const [blockClicked, setBlockClicked] = useState<number>();

    const pathname = usePathname();

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const buttonType = useAppSelector((state) => state.Button.buttonType);
    const user = useAppSelector((state) => state.User.user);

    const replaceUrl = (newUrl: string) => {
        window.history.replaceState({
            as: newUrl,
            url: newUrl
        },
            '',
            newUrl);
    };

    return (
        <div className={styles.channel__blocks}>

            <div className={styles.channel__blocks__overlay}>
                {
                    user && user.id == block.user ?
                        <DisconnectBlockButton setBlockClicked={setBlockClicked} blockID={block.id} />
                        : <ConnectBlockButton setBlockClicked={setBlockClicked} blockID={block.id} />
                }
            </div>

            <div
                onClick={() => { dispatch(setIsOpen(!isOpen)); replaceUrl(`/block/${block.id}`); setBlockClicked(block.id) }}

            >
                {/* <div>Pathname: {pathname}</div>
                <div>Block Clicked: {blockClicked}</div> */}
                <h4>#{block.id} - {block.title}</h4>
                <h4>{block.image_url}</h4>
            </div>

            <>
                {
                    isOpen && blockClicked == block.id && !buttonType ?
                        <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)); replaceUrl(pathname); setBlockClicked(undefined) }} isOpen={isOpen} >
                            <button onClick={() => { dispatch(setIsOpen(!isOpen)); replaceUrl(pathname); setBlockClicked(undefined) }}>Close</button>
                            <Block block={block} />
                        </Modal>
                        : null
                }
            </>
            <>
                {
                    isOpen && blockClicked == block.id && buttonType == BUTTON.BLOCK_CONNECTION_CREATE ?
                        <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)); dispatch(setButtonType('')); setBlockClicked(undefined); }} isOpen={isOpen}>
                            <button onClick={() => { dispatch(setIsOpen(!isOpen)); dispatch(setButtonType('')); setBlockClicked(undefined); }}>Close</button>
                            <ConnectionBlock blockID={block.id} />
                        </Modal>
                        : null
                }
            </>
            <>
                {
                    isOpen && channelID && blockClicked == block.id && buttonType == BUTTON.BLOCK_CONNECTION_DELETE ?
                        <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)); dispatch(setButtonType('')); setBlockClicked(undefined); }} isOpen={isOpen}>
                            <button onClick={() => { dispatch(setIsOpen(!isOpen)); dispatch(setButtonType('')); setBlockClicked(undefined); }}>Close</button>
                            <RemoveConnectionBlock blockID={block.id} channelID={channelID} />
                        </Modal>
                        : null
                }
            </>
        </div>
    )
};

export default BlockGrid;