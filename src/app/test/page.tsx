"use client"
// Imports
// Packages
import { IChannel, IPageProps } from "@/utils/types/types";
import userValidation from "@/resources/validations/user.validation";
import { useState } from "react";

const page = (props: IPageProps) => {

    let payload = {
        first_name: "Test"
    };

    const [data, setData] = useState();


    const handleClick = () => {
        const res = userValidation.update.validate(payload);
        setData(res.value);
        console.log(res);
    }

    return (
        <>
            <div>TESTING</div>
            <div>
                {
                    data ?
                    <div>
                       { JSON.stringify(data)}
                    </div>
                    : null
                }
            </div>
            <button onClick={handleClick}>Test validation</button>
        </>
    )
}

export default page