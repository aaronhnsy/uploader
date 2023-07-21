"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "./logo_200x40.png";
import { NavbarLink } from "./navbarLink";

const togglerIconOpened = (
    <svg className="w-6 h-6 fill-white hover:fill-gray-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"/>
    </svg>
);
const togglerIconClosed = (
    <svg className="w-6 h-6 fill-white hover:fill-gray-400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"/>
    </svg>
);

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="flex flex-wrap items-center justify-between mb-3">
            <Image src={logo} alt="logo"></Image>
            <div className="flex items-center sm:order-2">
                <Link className="px-2 py-1 me-3 sm:me-0 rounded font-medium text-sm text-black bg-yellow-400 hover:bg-yellow-600" href={"/login"}>Log In</Link>
                <button className="inline-flex items-center justify-center w-10 h-10 sm:hidden" type="button" onClick={() => setIsOpen(!isOpen)}>{isOpen ? togglerIconOpened : togglerIconClosed}</button>
            </div>
            <div className={"sm:order-1 w-full sm:w-auto" + (isOpen ? " hidden" : "")}>
                <ul className="flex flex-col sm:flex-row mt-3 sm:mt-0 p-1 sm:p-0 sm:space-x-6 rounded bg-gray-800 sm:bg-transparent">
                    <NavbarLink href="/" text="Home"></NavbarLink>
                    <NavbarLink href="/test" text="Test"></NavbarLink>
                </ul>
            </div>
        </nav>
    );
}
