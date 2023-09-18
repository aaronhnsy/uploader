import Image from "next/image";
import FearlessTV from "./Fearless (Taylor's Version).png";
import RedTV from "./Red (Taylor's Version).png";

export default function Compare() {
    return (
        <div className="grid grid-cols-3 max-w-lg mx-auto text-center place-items-center p-2 rounded bg-gray-900">
            <div className="h-full w-full p-2 rounded bg-gray-950">
                <Image className="mb-2 rounded" src={FearlessTV} alt="Comparison Item 1"></Image>
                <h1 className="font-medium text-sm text-gray-900 dark:text-gray-100">Fearless (Taylor's Version)</h1>
            </div>
            <div>
                <h1 className="font-bold text-lg text-gray-900 dark:text-gray-100">VS</h1>
            </div>
            <div className="h-full w-full p-2 rounded bg-gray-950">
                <Image className="mb-2 rounded" src={RedTV} alt="Comparison Item 2"></Image>
                <h1 className="font-medium text-sm text-gray-900 dark:text-gray-100">Red (Taylor's Version)</h1>
            </div>
        </div>
    );
}
