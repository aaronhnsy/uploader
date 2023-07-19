"use client";

import Image from "next/image";
import { useState } from "react";
import logo from "./logo_200x40.png";
import { NavbarLink } from "./navbarLink";

export function Navbar() {
    // state
    const [isOpen, setIsOpen] = useState(false);
    // get the correct toggler icon
    let togglerIcon;
    if (isOpen) {
        togglerIcon = (
            <svg className="w-6 h-6 fill-gray-300 hover:fill-gray-500"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24"
                 fill="currentColor">
                <path fillRule="evenodd"
                      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"/>
            </svg>
        );
    }
    else {
        togglerIcon = (
            <svg className="w-6 h-6 fill-gray-300 hover:fill-gray-500"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24"
                 fill="currentColor">
                <path fillRule="evenodd"
                      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"/>
            </svg>
        );
    }
    // return the navbar
    return (
        <nav className="flex flex-wrap items-center justify-between mb-3">
            <Image src={logo} alt="logo"></Image>
            <div className="flex sm:order-2">
                <button className="p-1.5 me-3 sm:me-0 rounded text-sm font-medium bg-yellow-400" type="button">Sign In</button>
                <button
                    className="inline-flex items-center justify-center w-10 h-10 sm:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                >{togglerIcon}</button>
            </div>
            <div className={`w-full sm:w-auto ${isOpen && "hidden"} sm:block sm:order-1`}>
                <ul className="flex flex-col sm:flex-row mt-3 sm:mt-0 p-1 sm:p-0 sm:space-x-6 rounded bg-gray-800 sm:bg-transparent">
                    <NavbarLink href="/" text="Home"></NavbarLink>
                    <NavbarLink href="/test" text="Test"></NavbarLink>
                </ul>
            </div>
        </nav>
    );
}
