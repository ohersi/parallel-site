"use client";
// Imports

interface IDisconnectBlockButton {
    channelID: number;
    blockID: number;
}

const DisconnectBlockButton = ({ channelID, blockID }: IDisconnectBlockButton) => {

    return (
        <>
            <button onClick={() => console.log(`removing connection b/w block to channel`)}>Remove Connect</button>
        </>
    )
};

export default DisconnectBlockButton;