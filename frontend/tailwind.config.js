const { coloursPlugin } = require("./tailwind.colours");

/** @type {import("tailwindcss").Config} **/
module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        fontFamily: {
            sans: ["var(--font-inter)"],
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
            },
        },
    },
    plugins: [coloursPlugin],
};
