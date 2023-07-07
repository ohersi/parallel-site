"use client";
// Packages
import { Dispatch, SetStateAction, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
// Imports
import { useAppDispatch, useAppSelector } from "@/store";
import { setIsOpen } from '@/store/isModalOpenSlice';
import { setButtonType } from '@/store/buttonTypeSlice';
import { GetUserChannels } from "@/resources/data/channel/getUserChannels";
import { ConnectBlock } from "@/resources/data/block/connectBlock";
import { ISearchResults } from "@/utils/types/types";
import styles from "@/styles/components/block/connection.block.module.scss";

interface IConnectionBlock {
    blockID: number;
    setBlockClicked: Dispatch<SetStateAction<number | undefined>>
}

const ConnectionBlock = ({ blockID, setBlockClicked }: IConnectionBlock) => {

    // TODO: Create search field, filter user channels

    const [search, setSearch] = useState<string>('');

    let channelClicked: number | undefined;

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.User.user);
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const buttonType = useAppSelector((state) => state.Button.buttonType);

    const { data } = useSWR(user ? `/api/v1/users/${user.id}/channels` : null, () => user ? GetUserChannels(user.id) : () => { });

    const { trigger, error: error } = useSWRMutation(`api/v1/blocks/${blockID}/connect?channel=${channelClicked}`, () => ConnectBlock(blockID, channelClicked));

    const arr = data ? data.data : null;

    const handleClick = async (channelID: number) => {

        channelClicked = channelID;

        await trigger().then((success) => {
            if (success) {
                // TODO: Disable connect if success replace with checkmark
            }
            channelClicked = undefined
        });
    }

    return (
        <div className={styles.modal}>
            {/* <div>CONNECTION BLOCK {blockID}</div> */}
            <div className={styles.modal__close_btn}>
                <svg
                    onClick={() => {
                        dispatch(setIsOpen(!isOpen));
                        dispatch(setButtonType(''));
                        setBlockClicked(undefined);
                    }}
                    xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 15" fill="none">
                    <line x1="1.96612" y1="0.427971" x2="16.0827" y2="14.5446" stroke="currentColor" />
                    <line x1="1.25901" y1="14.5445" x2="15.3756" y2="0.427954" stroke="currentColor" />
                </svg>
            </div>
            <div className={styles.modal__search}>
                <input
                    className={styles.modal__search__input}
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search channels..."
                />
                <div className={styles.modal__search__icon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.92197 1.64378C11.342 1.64378 14.1145 4.41627 14.1145 7.8363C14.1145 11.2563 11.342 14.0288 7.92197 14.0288C4.50193 14.0288 1.72945 11.2563 1.72945 7.8363C1.72945 4.41627 4.50193 1.64378 7.92197 1.64378ZM7.92197 0.643784C11.8943 0.643784 15.1145 3.86398 15.1145 7.8363C15.1145 9.64251 14.4487 11.2932 13.3492 12.5564L17.6382 16.8454C17.8335 17.0407 17.8335 17.3573 17.6382 17.5525C17.4429 17.7478 17.1264 17.7478 16.9311 17.5525L12.6421 13.2635C11.3789 14.363 9.72818 15.0288 7.92197 15.0288C3.94965 15.0288 0.729449 11.8086 0.729449 7.8363C0.729449 3.86398 3.94965 0.643784 7.92197 0.643784Z" fill="currentColor" />
                    </svg>
                </div>
            </div>
            <div className={styles.modal__channel}>
                <span className={styles.modal__channel__header}>SEARCH CHANNELS</span>

                <div className={styles.modal__channel__list}>
                    {
                        arr && !error ?
                            arr.filter((res: ISearchResults) => (
                                search.toLowerCase() === '' ? res :
                                    res.channel.title.toLowerCase().includes(search.toLowerCase())
                            ))
                                .map((res: ISearchResults) => (
                                    <div
                                        className={styles.modal__channel__list__item}
                                        key={res.channel.title}
                                    >
                                        <h4>{res.channel.title}</h4>
                                        <button
                                            className={styles.modal__channel__list__item__btn}
                                            onClick={() => handleClick(res.channel.id)}>
                                            connect &nbsp; →
                                        </button>
                                    </div>
                                ))
                            : null
                    }
                    <div className={styles.modal__channel__list__item}>
                        <h4>Channel 1</h4>
                        <button
                            className={styles.modal__channel__list__item__btn}>
                            connect &nbsp; →
                        </button>
                    </div>
                    <div className={styles.modal__channel__list__item}>
                        <h4>Channel 1</h4>
                        <button
                            className={styles.modal__channel__list__item__btn}>
                            connect &nbsp; →
                        </button>
                    </div>
                    <div className={styles.modal__channel__list__item}>
                        <h4>Channel 1</h4>
                        <button
                            className={styles.modal__channel__list__item__btn}>
                            connect &nbsp; →
                        </button>
                    </div>
                    <div className={styles.modal__channel__list__item}>
                        <h4>Channel 1</h4>
                        <button
                            className={styles.modal__channel__list__item__btn}>
                            connect &nbsp; →
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default ConnectionBlock;