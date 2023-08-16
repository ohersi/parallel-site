"use client";
// Packages
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
// Imports
import { store, persistor } from "@/store";
import ThemesProvider from "@/lib/themes.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemesProvider>
                    {children}
                </ThemesProvider>
            </PersistGate>
        </Provider>
    )
};