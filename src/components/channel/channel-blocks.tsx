"use client";
// Packages
import Link from 'next/link';
// Imports
import { Block } from '@/utils/types/types';
import Modal from '@/components/modal/modal';
import { setIsOpen } from '@/store/isModalOpenSlice';
import { useAppDispatch, useAppSelector } from '@/store';
import styles from "@/styles/channel/channel.module.css";

interface IChannelBlocks {
    block: Block
};
const ChannelBlocks = ({ block }: IChannelBlocks) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    return (
        <div className={styles.channel_blocks}>
            <h4>#{block.id} - {block.title}</h4>
            <h4>{block.image_url}</h4>
            <Link href={`block/${block.id}`}>To Block</Link>
            <div>
                <button onClick={() => dispatch(setIsOpen(!isOpen))}>Click to open Modal</button>
                <div>
                    {isOpen ?
                        <Modal handleClose={() => dispatch(setIsOpen(!isOpen))} isOpen={isOpen}>
                            This is Modal Content!
                        </Modal>
                        : null
                    }
                </div>
            </div>

        </div>
    )
};

export default ChannelBlocks;