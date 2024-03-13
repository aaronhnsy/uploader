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
        fontFamily: {
            sans: ["var(--font-inter)"]
        },
        extend: {
            colors: {
                "theme-primary": "rgb(var(--theme-primary) / <alpha-value>)",
                "theme-primary-hover": "rgb(var(--theme-primary-hover) / <alpha-value>)",
                "theme-secondary": "rgb(var(--theme-secondary) / <alpha-value>)",
                "theme-secondary-hover": "rgb(var(--theme-secondary-hover) / <alpha-value>)",
                "theme-tertiary": "rgb(var(--theme-tertiary) / <alpha-value>)",
                "theme-tertiary-hover": "rgb(var(--theme-tertiary-hover) / <alpha-value>)",
                "theme-text": "rgb(var(--theme-text) / <alpha-value>)",
                "theme-text-hover": "rgb(var(--theme-text-hover) / <alpha-value>)",
                "theme-accent": "rgb(var(--theme-accent) / <alpha-value>)",
                "theme-accent-hover": "rgb(var(--theme-accent-hover) / <alpha-value>)",
            }
        }
    },
    plugins: [
        plugin(
            function ({addBase}) {
                addBase({
                    "html[data-theme*='light']": {
                        "--theme-primary": toRgb(colors.neutral[100]),
                        "--theme-primary-hover": toRgb(colors.neutral[200]),
                        "--theme-secondary": toRgb(colors.neutral[200]),
                        "--theme-secondary-hover": toRgb(colors.neutral[300]),
                        "--theme-tertiary": toRgb(colors.neutral[300]),
                        "--theme-tertiary-hover": toRgb(colors.neutral[400]),
                        "--theme-text": toRgb(colors.neutral[800]),
                        "--theme-text-hover": toRgb(colors.neutral[900]),
                    },
                    "html[data-theme*='dark']": {
                        "--theme-primary": toRgb(colors.gray[700]),
                        "--theme-primary-hover": toRgb(colors.gray[800]),
                        "--theme-secondary": toRgb(colors.gray[800]),
                        "--theme-secondary-hover": toRgb(colors.gray[900]),
                        "--theme-tertiary": toRgb(colors.gray[900]),
                        "--theme-tertiary-hover": toRgb(colors.gray[950]),
                        "--theme-text": toRgb(colors.neutral[200]),
                        "--theme-text-hover": toRgb(colors.neutral[100]),
                    },
                    ...accentColourHtmlSelectors,
                });
            },
        ),
    ],
};
