"use client";
// Packages
import { Provider } from "react-redux";
// Imports
import { store } from "@/store";

export default function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
};