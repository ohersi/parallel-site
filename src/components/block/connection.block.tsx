"use client";
// Packages
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
// REDUX
import { useAppDispatch, useAppSelector } from "@/store";
import { setIsOpen } from '@/store/modalSlice';
import { setButtonType } from '@/store/buttonTypeSlice';
import { setBlockClicked } from '@/store/blockClickedSlice';
// FUNCTIONS
import { GetUserChannels } from "@/resources/data/channel/getUserChannels";
import { ConnectBlock } from "@/resources/data/block/connectBlock";
// TYPES
import { ISearchResults } from "@/utils/types/types";
// STYLES
import styles from "@/styles/components/block/connection.block.module.scss";

interface IConnectionBlock {
    blockID: number;
}

const ConnectionBlock = ({ blockID }: IConnectionBlock) => {

    const [search, setSearch] = useState<string>('');
    const [connected, setConnected] = useState<any>({});

    let channelClicked: number | undefined;

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.User.user);
    const isOpen = useAppSelector((state) => state.Modal.isOpen);
    const blockModalOpen = useAppSelector((state) => state.Modal.isBlockModalOpen);
    const buttonType = useAppSelector((state) => state.Button.buttonType);

    const { data } = useSWR(user ? `/api/v1/users/${user.id}/channels` : null, () => user ? GetUserChannels(user.id) : () => { });

    const { trigger, error: error } = useSWRMutation(`api/v1/blocks/${blockID}/connect?channel`, () => ConnectBlock(blockID, channelClicked));

    const arr = data ? data.data : null;

    const handleClick = async (channelID: number) => {

        channelClicked = channelID;
        console.log(`channelClicked: ${channelClicked}`)

        await trigger()
            .then((res) => {
                console.log(res)
                if (res) {
                    if (typeof channelClicked === 'number') {
                        let obj = { [channelClicked]: res.success };
                        setConnected((connected: {}) => ({
                            ...connected,
                            ...obj
                        }))
                    }
                }
                // TODO: Disable connect if success replace with checkmark
            })
            .finally(() => channelClicked = undefined);
    }
    console.log(connected);

    return (
        <div className={styles.modal}>
            <div className={styles.modal__box}>
                {/* <div>CONNECTION BLOCK {blockID}</div> */}
                <div className={styles.modal__box__close_btn}>
                    <svg
                        onClick={() => {
                            blockModalOpen ? null : dispatch(setIsOpen(!isOpen));
                            blockModalOpen ? null : dispatch(setBlockClicked(undefined));
                            dispatch(setButtonType(''));
                        }}
                        xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 15" fill="none">
                        <line x1="1.96612" y1="0.427971" x2="16.0827" y2="14.5446" stroke="currentColor" />
                        <line x1="1.25901" y1="14.5445" x2="15.3756" y2="0.427954" stroke="currentColor" />
                    </svg>
                </div>
                <div className={styles.modal__box__search}>
                    <input
                        className={styles.modal__box__search__input}
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search channels..."
                    />
                    <div className={styles.modal__box__search__icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.92197 1.64378C11.342 1.64378 14.1145 4.41627 14.1145 7.8363C14.1145 11.2563 11.342 14.0288 7.92197 14.0288C4.50193 14.0288 1.72945 11.2563 1.72945 7.8363C1.72945 4.41627 4.50193 1.64378 7.92197 1.64378ZM7.92197 0.643784C11.8943 0.643784 15.1145 3.86398 15.1145 7.8363C15.1145 9.64251 14.4487 11.2932 13.3492 12.5564L17.6382 16.8454C17.8335 17.0407 17.8335 17.3573 17.6382 17.5525C17.4429 17.7478 17.1264 17.7478 16.9311 17.5525L12.6421 13.2635C11.3789 14.363 9.72818 15.0288 7.92197 15.0288C3.94965 15.0288 0.729449 11.8086 0.729449 7.8363C0.729449 3.86398 3.94965 0.643784 7.92197 0.643784Z" fill="currentColor" />
                        </svg>
                    </div>
                </div>
                <div className={styles.modal__box__channel}>
                    <span className={styles.modal__box__channel__header}>SEARCH CHANNELS</span>

                    <div className={styles.modal__box__channel__list}>
                        {
                            arr && !error ?
                                arr.filter((res: ISearchResults) => (
                                    search.toLowerCase() === '' ? res :
                                        res.channel.title.toLowerCase().includes(search.toLowerCase())
                                ))
                                    .map((res: ISearchResults) => (
                                        <div
                                            className={styles.modal__box__channel__list__item}
                                            key={res.channel.title}
                                        >
                                            <div className={styles.modal__box__channel__list__item__title}>{res.channel.title}</div>
                                            {
                                                connected[`${res.channel.id}`] === true ?
                                                    <span className={styles.modal__box__channel__list__item__status}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5.58049 17.352L0.273232 12.0448L0.980338 11.3376L6.20421 16.5615L18.5601 0.90168L19.3452 1.5211L6.36555 17.9714L5.58049 17.352Z" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                    :
                                                    connected[`${res.channel.id}`] === false ?
                                                        <span className={styles.modal__box__channel__list__item__status}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.738 10.4366C20.738 15.6279 16.5296 19.8363 11.3383 19.8363C6.14697 19.8363 1.93858 15.6279 1.93858 10.4366C1.93858 5.24525 6.14697 1.03686 11.3383 1.03686C16.5296 1.03686 20.738 5.24525 20.738 10.4366ZM21.738 10.4366C21.738 16.1802 17.0819 20.8363 11.3383 20.8363C5.59469 20.8363 0.938583 16.1802 0.938583 10.4366C0.938583 4.69296 5.59469 0.0368576 11.3383 0.0368576C17.0819 0.0368576 21.738 4.69296 21.738 10.4366ZM15.3924 14.704L11.3383 10.6499L7.2842 14.704L6.5771 13.9969L10.6312 9.94281L6.8575 6.16912L7.5646 5.46201L11.3383 9.2357L15.112 5.46202L15.8191 6.16912L12.0454 9.94281L16.0995 13.9969L15.3924 14.704Z" fill="currentColor" />
                                                            </svg> 
                                                            FAILED
                                                        </span>
                                                        :
                                                        <button
                                                            className={styles.modal__box__channel__list__item__btn}
                                                            onClick={() => handleClick(res.channel.id)}>
                                                            connect &nbsp; →
                                                        </button>
                                            }
                                        </div>
                                    ))
                                : null
                        }
                        {/* <div className={styles.modal__channel__list__item}>
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
                    </div> */}
                    </div>

                </div>
            </div>
        </div>

    )
};

export default ConnectionBlock;