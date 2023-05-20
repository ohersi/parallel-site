"use client"
import Modal from '@/components/modal/modal';
import React, { useState } from 'react';

type Props = {}

const page = (props: Props) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)}>
                Click to Open Modal
            </button>
            {isOpen ?
                <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
                    This is Modal Content!
                </Modal>
                : null}
            <div>TEST PAGE</div>
        </>
    )
}

export default page