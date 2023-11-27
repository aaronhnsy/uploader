import { ThemeChanger } from "@/src/components/footer/themeChanger";

export function Footer() {
    return (
        <footer className="flex justify-between items-center p-2 bg-primary rounded">
            <p className="font-medium text-md text-gray-100">Made by Axelancerr</p>
            <ThemeChanger/>
        </footer>
    );
}
