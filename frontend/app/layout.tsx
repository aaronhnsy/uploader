import React from "react";

import { NavBar } from "../components/navbar";

import "./global.css";

export default function Layout(
    {children}: { children: React.ReactNode },
) {
    return (
        <html lang="en">
            <head/>
            <body>
                <div className="md:container md:mx-auto bg-blue-900">
                    <NavBar/>
                    {children}
                </div>
            </body>
        </html>
    );
}
