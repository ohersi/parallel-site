"use client";
// Packages
import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams, usePathname } from 'next/navigation';
// Imports
import { IBlock } from '@/utils/types/types';
import Block from '@/components/block/block';
import Modal from '@/components/modal/modal';
import { setIsOpen } from '@/store/isModalOpenSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import styles from "@/styles/channel/channel.module.css";

interface IChannelBlocks {
    block: IBlock
};

const ChannelBlocks = ({ block }: IChannelBlocks) => {

    const pathname = usePathname();
    const params = useParams();
    const paramsID = parseInt(params.id);

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

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
            <div
                onClick={() => { dispatch(setIsOpen(!isOpen)); replaceUrl(`/block/${block.id}`) }}
                className={styles.channel_blocks}
            >
                <div>Pathname: {pathname}</div>
                <h4>#{block.id} - {block.title}</h4>
                <h4>{block.image_url}</h4>
            </div>
            <div>
                {
                    isOpen && paramsID == block.id ?
                        <Modal handleClose={() => { dispatch(setIsOpen(!isOpen)); replaceUrl(pathname) }} isOpen={isOpen} >
                            <Block block={block} />
                        </Modal>
                        : null
                }
            </div>
        </>
    )
};

export default ChannelBlocks;