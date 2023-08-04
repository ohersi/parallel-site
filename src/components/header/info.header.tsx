"use client";
// Packages
import Link from "next/link";
// Imports
import { useAppDispatch, useAppSelector } from "@/store";
import { setViewType, setSortType } from "@/store/filterTypeSlice";
import { FEED, IPageProps, SORT, FOLLOW } from "@/utils/types/types";
import styles from "@/styles/layout/header.module.scss";

interface IHeaderInfo {
    props: any;
    params?: IPageProps['params'];
    type?: string;
};

const HeaderInfo = ({ props, params, type }: IHeaderInfo) => {

    const dispatch = useAppDispatch();
    const viewType = useAppSelector((state) => state.Filter.viewType);
    const sortType = useAppSelector((state) => state.Filter.sortType);

    return (
        <div className={
            props.email && type !== FOLLOW.USER ?
                styles.header__grid
                : typeof props == 'string' && type !== FOLLOW.USER ?
                    styles.header__double
                    : styles.header__single
        }>

            {
                typeof props !== 'string' ?
                    <div className={styles.header__grid__info}>
                        <div className={styles.header__grid__info__title}>Info</div>
                        {
                            props?.description ?
                                <p>{props.description}</p>
                                : <p>&mdash;</p>
                        }
                        {
                            type === FEED.CHANNEL ?
                                <div className={styles.header__grid__info__buttons}>
                                    <div className={styles.header__grid__info__buttons__follow}>
                                        <Link href={`/${params?.userID}/${params?.channelID}/followers`}>Followers</Link>
                                    </div>
                                </div>
                                :
                                <div className={styles.header__grid__info__buttons}>
                                    <div className={styles.header__grid__info__buttons__follow}>
                                        <Link href={`/${params?.userID}/followers`}>Followers</Link>
                                    </div>
                                    <div className={styles.header__grid__info__buttons__follow}>
                                        <Link href={`/${params?.userID}/following`}>Following</Link>
                                    </div>
                                </div>
                        }
                    </div>
                    : null
            }

            {
                props?.email && type !== FOLLOW.USER ?
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
                    :
                    typeof props === 'string' ?
                        <div className={styles.header__double__info}>
                            <div className={styles.header__double__info__title}>View</div>

                            <div className={styles.header__double__info__buttons}>
                                <div onClick={() => dispatch(setViewType(FEED.ALL))}>
                                    All
                                    {
                                        viewType == FEED.ALL ?
                                            <span>&nbsp; &#8592;</span>
                                            : null
                                    }
                                </div>
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

                props?.email && type !== FOLLOW.USER ?
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
                    : typeof props === 'string' ?
                        <div className={styles.header__double__info}>
                            <div className={styles.header__double__info__title}>Sort</div>
                            <div className={styles.header__double__info__buttons}>
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