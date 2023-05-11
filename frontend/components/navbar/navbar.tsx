"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useRef } from "react"
import logoSrc from "./logo_200x40.png"
import { usePathname } from 'next/navigation'

export function NavBar() {
    const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true)
    const collapseRef = useRef<HTMLDivElement | null>(null)
    const pathname = usePathname();

    if (collapseRef.current != null) {
        if (isNavbarCollapsed) {
            collapseRef.current.style["height"] = `${collapseRef.current.getBoundingClientRect()["height"]}px`
            collapseRef.current.offsetHeight // ?????????????
            collapseRef.current.classList.add("collapsing")
            collapseRef.current.classList.remove("collapse", "show")
            collapseRef.current.style["height"] = ""
        }
        else {
            collapseRef.current.classList.remove("collapse")
            collapseRef.current.classList.add("collapsing")
            collapseRef.current.style["height"] = "0px"
            collapseRef.current.style["height"] = `${collapseRef.current.scrollHeight}px`
        }
    }
    const onTransitionEnd = () => {
        if (collapseRef.current != null) {
            if (isNavbarCollapsed) {
                collapseRef.current.classList.remove("collapsing")
                collapseRef.current.classList.add("collapse")
            }
            else {
                collapseRef.current.classList.remove("collapsing")
                collapseRef.current.classList.add("collapse", "show")
                collapseRef.current.style["height"] = ""
            }
        }
    }
    return (
        <nav className="navbar navbar-expand-sm mb-2">
            <div className="container-sm">
                <a className="navbar-brand" href="#">
                    <Image src={logoSrc} alt="logo" priority></Image>
                </a>
                <div className="btn-group">
                    <div className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle me-1" href="#" type="button">
                            <Image className="rounded-circle me-1" src="https://placehold.co/32.png" alt="avatar" width="32" height="32"></Image>
                        </a>
                        {/* dropdown menu here */}
                    </div>
                    <button className={"navbar-toggler border-0 px-2" + (isNavbarCollapsed ? " collapsed" : "")} type="button" onClick={() => setIsNavbarCollapsed(!isNavbarCollapsed)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#DEE2E6" className="bi bi-list" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"></path>
                        </svg>
                    </button>
                </div>
                <div className="navbar-collapse collapse" ref={collapseRef} onTransitionEnd={(e) => e.propertyName == "height" ? onTransitionEnd() : null}>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className={"nav-link" + (pathname == "/" ? "active" : "")} href="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={"nav-link" + (pathname == "/about" ? "active" : "")} href="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={"nav-link" + (pathname == "/faq" ? "active" : "")} href="/faq">FAQ</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}