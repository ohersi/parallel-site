"use client";
// Packages
import { useEffect } from 'react';
// Imports
import { useAppSelector } from '@/store';
import { THEME } from '@/utils/types/types';

export default function ThemesProvider({ children }: { children: React.ReactNode }) {

    const currentTheme = useAppSelector((state) => state.Theme.theme);

    useEffect(() => {

        const element = document.body;

        element.className = '';

        if (currentTheme && currentTheme !== THEME.DEFAULT) element.classList.add(`theme_${currentTheme}`);

    }, [])


    return (
        <>
            {children}
        </>
    );
};