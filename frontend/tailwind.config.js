const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const {accentColourHtmlSelectors, toRgb} = require("./tailwind.colours");

/** @type {import("tailwindcss").Config} */
module.exports = {
    darkMode: ["class", "[data-theme*='dark']"],
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        fontFamily: {sans: ["var(--font-inter)"]},
        extend: {
            colors: {
                "background": "rgb(var(--background) / <alpha-value>)",
                "background-hover": "rgb(var(--background-hover) / <alpha-value>)",
                "primary": "rgb(var(--primary) / <alpha-value>)",
                "primary-hover": "rgb(var(--primary-hover) / <alpha-value>)",
                "secondary": "rgb(var(--secondary) / <alpha-value>)",
                "tertiary": "rgb(var(--tertiary) / <alpha-value>)",
                "accent": "rgb(var(--accent-normal) / <alpha-value>)",
                "accent-hover": "rgb(var(--accent-hover) / <alpha-value>)",
            },
        },
    },
    plugins: [
        plugin(
            function ({addBase}) {
                addBase({
                    "html": {
                        "--primary": toRgb(colors.gray[800]),
                        "--primary-hover": toRgb(colors.gray[900]),
                        "--secondary": toRgb(colors.gray[900]),
                        "--tertiary": toRgb(colors.gray[950]),
                    },
                    "html[data-theme*='light']": {
                        "--background": toRgb(colors.gray[200]),
                        "--background-hover": toRgb(colors.gray[300]),
                    },
                    "html[data-theme*='dark']": {
                        "--background": toRgb(colors.gray[700]),
                        "--background-hover": toRgb(colors.gray[800]),
                    },
                    ...accentColourHtmlSelectors,
                });
            },
        ),
    ],
};
