"use client";
// Packages
import { useState } from 'react';
import { usePathname } from 'next/navigation';
// Imports
import { useAppDispatch, useAppSelector } from '@/store';
import { setIsOpen } from '@/store/isModalOpenSlice';
import { setButtonType } from '@/store/buttonTypeSlice';
import ConnectBlockButton from '../button/block/connectBlock.button';
import ConnectionBlock from '../block/connection.block';
import Block from '@/components/block/block';
import Modal from '@/components/modal/modal';
import { BUTTON, IBlock } from "@/utils/types/types";
import styles from "@/styles/channel/channel.module.css";

interface IChannelBlocks {
    block: IBlock
};

const ChannelBlocks = ({ block }: IChannelBlocks) => {

    const [blockClicked, setBlockClicked] = useState<number>();

    const pathname = usePathname();

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const buttonType = useAppSelector((state) => state.Button.buttonType);

    const replaceUrl = (newUrl: string) => {
        window.history.replaceState({
            as: newUrl,
            url: newUrl
        },
            '',
            newUrl);
    };

    return (
        <>
            <ConnectBlockButton setBlockClicked={setBlockClicked} blockID={block.id} />

            <div
                onClick={() => { dispatch(setIsOpen(!isOpen)); replaceUrl(`/block/${block.id}`); setBlockClicked(block.id) }}
                className={styles.channel_blocks}
            >
                <div>Pathname: {pathname}</div>
                <div>Block Clicked: {blockClicked}</div>
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
        </>
    )
};

export default ChannelBlocks;