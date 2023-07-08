"use client";
// Packages
import useSWRMutation from "swr/mutation";
// Imports
import { useAppDispatch, useAppSelector } from "@/store";
import { setIsOpen } from "@/store/isModalOpenSlice";
import { setBlockClicked } from "@/store/blockClickedSlice";
import { setButtonType } from "@/store/buttonTypeSlice";
import { DisconnectBlock } from "@/resources/data/block/disconnectBlock";
import styles from "@/styles/components/block/removeConnection.block.module.scss";

interface IRemoveConnectionBlock {
    blockID: number;
    blockTitle: string;
    channelID: number;
    channelTitle: string;
}

const RemoveConnectionBlock = ({ blockID, blockTitle, channelID, channelTitle }: IRemoveConnectionBlock) => {

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.Modal.isOpen);

    const { trigger, error: error } = useSWRMutation(`api/v1/blocks/${blockID}/disconnect?channel=${channelID}`, () => DisconnectBlock(blockID, channelID));

    const handleClick = async () => {
        await trigger()
            .then(() => dispatch(setIsOpen(!isOpen)));
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modal__box}>
                <p>Remove block: `{blockTitle}` from channel: `{channelTitle}`?</p>

                <div className={styles.modal__box__button}>
                    <button
                        className={styles.modal__box__button__cancel}
                        onClick={() => {
                            dispatch(setIsOpen(!isOpen))
                            dispatch(setButtonType(''));
                            dispatch(setBlockClicked(undefined));
                        }}>
                        Cancel
                    </button>
                    <button
                        className={styles.modal__box__button__confirm}
                        // onClick={() => handleClick}
                        onClick={() => { console.log('testing remove connection!') }}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
};

export default RemoveConnectionBlock;