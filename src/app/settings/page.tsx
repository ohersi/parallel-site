// "use client";
import { IPageProps } from "@/utils/types/types";
import UpdateUserForm from "@/components/form/updateUser.form";

const SettingsPage = (props: IPageProps) => {

    return (
        <>
            <div>SETTINGS</div>
            <UpdateUserForm />
        </>
    )
};

export default SettingsPage;