"use client";
// Packages
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
// Imports
import { persistor } from "@/store";
import { LogOutUser } from "@/resources/data/user/logoutUser";

const LogoutButton = () => {

    const router = useRouter();

    const { trigger, error } = LogOutUser();

    const logOut: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        await persistor.purge(); // Clear storage
        try {
            // Clear cookie
            trigger().then((success) => {
                if (success) router.refresh()
            })
        }
        catch (error: any) {
            // TODO: Create Logout error handling
            console.log(error);
        }
    };

    return (
        <button onClick={logOut}>Log Out</button>
    )
};

export default LogoutButton;