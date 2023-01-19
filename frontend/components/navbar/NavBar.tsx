import Image from "next/image";
import Link from "next/link";
import logoSrc from "./logo_200x40.png";

export function NavBar() {
    return (
        <nav className="flex flex-row-reverse p-2 bg-blue-700">
            <Image src={logoSrc} alt="Uploader Logo"></Image>
	    <div className="ms-auto">
	        <Link href="/about">About</Link>
                <Link href="/faq">FAQ</Link>
	    </div>
        </nav>
    );
}
