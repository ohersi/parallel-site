// "use client"
// Imports
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from 'next/headers';
import useSWR from "swr";
// Packages
import { IChannel, IPageProps } from "@/utils/types/types";

// Currently Next JS or React cache() does not cache duplicate API request when using axios

async function getTestData(props: IPageProps) {

    const session = cookies().get('connect.sid');
    const id = session?.name.concat('='+session.value);

    try {
        const res = await fetch(`http://localhost:3000/api/v1/users/`, {
            next: { revalidate: 10 },
            method: 'GET',
            headers: {
                cookie: id!
            },
            credentials: 'include',
        });

        // console.log(res);

        if (!res.ok) {
            return await res.text();
        }

        // Contains Page info and channel data
        const data = await res.json();

        return data;
    }
    catch (error: any) {
        console.log(error);
    }
}

// // Dynamic Metadata for Pages
// export const generateMetadata = async (props: IPageProps): Promise<Metadata> => {

//     const data = await getTestData(props); // 1st API request
//     console.log('data fetched --- generateMetadata');

//     const channel: IChannel = data.data;

//     return { title: `${channel.title} — Parallel` };
// }


const page = async (props: IPageProps) => {

    // database fetching
    const res = await getTestData(props); // 2nd API request

    const testData = res;

    // console.log(testData);

    return (
        <>
            <div>{JSON.stringify(testData)}</div>
        </>
    )
}

// const page = (props: IPageProps) => {

//     // database fetching
//     const { data, error } = useSWR('admin@email.com', getTestData);

//     if (error) return <div>failed to load</div>
//     if (!data) return <div>loading...</div>;

//     const users = data;
//     console.log(users);

//     return (
//         <>
//             <div>{JSON.stringify(users)}</div>
//         </>
//     )
// }

export default page