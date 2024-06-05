import plugin from "tailwindcss/plugin";
import { cssRules, tailwindColours } from "./src/styles/colours";

/** @type {import("tailwindcss").Config} **/
module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        fontFamily: { sans: ["var(--font-inter)"] },
        extend: { colors: tailwindColours },
    },
    plugins: [
        plugin(({ addBase }) => {
            addBase(cssRules);
        }),
    ],
};
