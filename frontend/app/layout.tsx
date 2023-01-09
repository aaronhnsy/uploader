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
                <div className="container">
                    <NavBar/>
                    {children}
                </div>
            </body>
        </html>
    );
}
