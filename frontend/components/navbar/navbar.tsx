import Image from "next/image"
import Link from "next/link"
import logoSrc from "./logo_200x40.png"

export function NavBar() {
    return (
        <nav className="">
            <div className="">
                <Image src={logoSrc} alt="TODO"></Image>
                <div className="">
                    <button type="button" className="btn btn-primary">Get started</button>
                    <button data-collapse-toggle="navbar-cta" type="button" className="btn btn-primary" aria-controls="navbar-cta" aria-expanded="false">
                        <svg className="" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div className="">
                    <ul className="">
                        <Link href="/">Home</Link>
                        <Link href="/about">About</Link>
                        <Link href="/faq">FAQ</Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
