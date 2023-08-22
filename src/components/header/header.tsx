import React, { ReactNode } from 'react';
import styles from "@/styles/layout/header.module.scss";

interface IHeader {
  title?: ReactNode;
  action?: ReactNode;
  info?: ReactNode;
}

const Header = ({ title, action, info }: IHeader) => {

  return (
    <div className={styles.header}>
      <div className={styles.header__top}>
        <>{title}</>
        <>{action}</>
      </div>
      <>{info}</>
    </div>
  )
}

export default Header;