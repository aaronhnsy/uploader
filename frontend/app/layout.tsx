import { NavBar } from "@/components/navbar"
import React from "react"

import "../styles/bootstrap.scss"
import "../styles/global.scss"

export default function Layout(
    {children}: { children: React.ReactNode },
) {
    return (
        <html lang="en">
            <head/>
            <body className="">
                <div className="">
                    <NavBar/>
                    {children}
                </div>
            </body>
        </html>
    )
}
