"use client";
// Packages
import { MouseEventHandler } from "react";
// Imports
import { persistor } from "@/store";
import { LogOutUser } from "@/resources/data/user/logoutUser";

const LogoutButton = () => {

    const { trigger, error } = LogOutUser();

    const logOut: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        persistor.purge(); // Clear storage
        try {
            trigger(); // Clear cookie
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