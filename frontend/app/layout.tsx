import { NavBar } from "@/components/navbar"
import { Metadata } from "next"
import React from "react"

import "@/styles/bootstrap.scss"
import "@/styles/global.scss"

export const metadata: Metadata = {
    title: "Uploader",
    viewport: {width: "device-width", initialScale: 1},
}

export default function Layout(
    {children}: { children: React.ReactNode },
) {
    return (
        <html lang="en" data-bs-theme={"dark"}>
            <body>
                <NavBar/>
                {children}
            </body>
        </html>
    )
}
