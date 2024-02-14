const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const {accentColourHtmlSelectors, toRgb} = require("./tailwind.colours");

/**
 * @type {import("tailwindcss").Config}
 **/
module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    darkMode: ["class", "[data-theme*='dark']"],
    theme: {
        fontFamily: {sans: ["var(--font-inter)"]},
        extend: {
            colors: {
                "colour-background": "rgb(var(--colour-background) / <alpha-value>)",
                "colour-background-hover": "rgb(var(--colour-background-hover) / <alpha-value>)",
                "colour-primary": "rgb(var(--colour-primary) / <alpha-value>)",
                "colour-secondary": "rgb(var(--colour-secondary) / <alpha-value>)",
                "colour-tertiary": "rgb(var(--colour-tertiary) / <alpha-value>)",
                "colour-accent-primary": "rgb(var(--colour-accent-primary) / <alpha-value>)",
                "colour-accent-secondary": "rgb(var(--colour-accent-secondary) / <alpha-value>)",
            },
        },
    },
    plugins: [
        plugin(
            function ({addBase}) {
                addBase({
                    "html[data-theme*='light']": {
                        "--colour-background": toRgb(colors.gray[200]),
                        "--colour-background-hover": toRgb(colors.gray[300]),
                    },
                    "html[data-theme*='dark']": {
                        "--colour-background": toRgb(colors.gray[700]),
                        "--colour-background-hover": toRgb(colors.gray[800]),
                    },
                    "html": {
                        "--colour-primary": toRgb(colors.gray[800]),
                        "--colour-secondary": toRgb(colors.gray[900]),
                        "--colour-tertiary": toRgb(colors.gray[950]),
                    },
                    ...accentColourHtmlSelectors,
                });
            },
        ),
    ],
};
