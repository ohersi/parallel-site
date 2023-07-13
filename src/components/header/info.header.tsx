"use client";
// Packages
import Link from "next/link";
// Imports
import { useAppDispatch, useAppSelector } from "@/store";
import { setViewType, setSortType } from "@/store/filterTypeSlice";
import { FEED, SORT } from "@/utils/types/types";
import styles from "@/styles/layout/header.module.scss";

interface IHeaderInfo {
    props: any;
    params?: string;
};

const HeaderInfo = ({ props, params }: IHeaderInfo) => {

    const dispatch = useAppDispatch();
    const viewType = useAppSelector((state) => state.Filter.viewType);
    const sortType = useAppSelector((state) => state.Filter.sortType);

    return (
        <div className={props?.email ? styles.header__grid : styles.header__single}>
            <div className={styles.header__grid__info}>
                <div className={styles.header__grid__info__title}>Info</div>
                {
                    props?.description ?
                        <p>{props.description}</p>
                        : <p>&mdash;</p>
                }
                <div className={styles.header__grid__info__buttons}>
                    <div className={styles.header__grid__info__buttons__follow}>
                        <Link href={`/${params}/followers`}>Followers</Link>
                    </div>
                    <div className={styles.header__grid__info__buttons__follow}>
                        <Link href={`/${params}/following`}>Following</Link>
                    </div>
                </div>
            </div>

            {
                props?.email ?
                    <div className={styles.header__grid__info}>
                        <div className={styles.header__grid__info__title}>View</div>

                        <div className={styles.header__grid__info__buttons}>
                            <div onClick={() => dispatch(setViewType(FEED.CHANNEL))}>
                                Channels
                                {
                                    viewType == FEED.CHANNEL ?
                                        <span>&nbsp; &#8592;</span>
                                        : null
                                }
                            </div>
                            <div onClick={() => dispatch(setViewType(FEED.BLOCK))}>
                                Blocks
                                {
                                    viewType == FEED.BLOCK ?
                                        <span>&nbsp; &#8592;</span>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                    : null
            }
            {

                props?.email ?
                    <div className={styles.header__grid__info}>
                        <div className={styles.header__grid__info__title}>Sort</div>
                        <div className={styles.header__grid__info__buttons}>
                            <div onClick={() => dispatch(setSortType(SORT.RECENTLY_UPDATED))}>
                                Recently Updated
                                {
                                    sortType == SORT.RECENTLY_UPDATED ?
                                        <span>&nbsp; &#8592;</span>
                                        : null
                                }
                            </div>
                            <div onClick={() => dispatch(setSortType(SORT.OLDEST))}>
                                Oldest
                                {
                                    sortType == SORT.OLDEST ?
                                        <span>&nbsp; &#8592;</span>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    )
};

export default HeaderInfo;