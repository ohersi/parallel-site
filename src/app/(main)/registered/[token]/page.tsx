// Packages
import Link from "next/link";
import { redirect } from "next/navigation";
// Imports
import { CheckUserToken } from "@/resources/data/user/checkUserToken";
import { IPageProps } from "@/utils/types/types";
import styles from "@/styles/pages/registered.page.module.scss";

const RegisteredPage = async ({ params }: IPageProps) => {

    const res = await CheckUserToken(params.token);

    if (res === null) redirect('/');

    return (
        <>
            {
                res === false ?
                    <div className={styles.page}>
                        <div className={styles.page__header}>
                            <span>Expired Token&nbsp;</span>
                            <span>&nbsp;:(</span>
                        </div>
                        <span className={styles.page__link}>
                            <Link href={'/login'}>
                                login to renew &nbsp; &#x2192;
                            </Link>
                        </span>
                    </div>
                    :
                    <div className={styles.page}>
                        <div>Account verified !</div>
                        <span className={styles.page__link}>
                            <Link href={'/'}>
                                home &nbsp; &#x2192;
                            </Link>
                        </span>
                    </div>
            }
        </>
    )
}

export default RegisteredPage;