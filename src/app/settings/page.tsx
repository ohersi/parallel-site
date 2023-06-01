"use client";
// Packages
import { redirect } from "next/navigation";
// Imports
import { IPageProps } from "@/utils/types/types";
import UpdateUserForm from "@/components/form/updateUser.form";
import DeleteUserButton from "@/components/button/deleteUser.button";
import { useAppSelector } from '@/store';

const SettingsPage = (props: IPageProps) => {

    const user = useAppSelector((state) => state.User.user);

    if (!user) redirect('/');

    return (
        <>
            <div>SETTINGS</div>
            <UpdateUserForm />
            <DeleteUserButton user={user}/>
        </>
    )
};

export default SettingsPage;