const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const {parseColor} = require("tailwindcss/lib/util/color");

const toRGB = (value) => parseColor(value).color.join(" ");

/** @type {import("tailwindcss").Config} */
module.exports = {
    darkMode: ["class", "[data-theme*='dark']"],
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        fontFamily: {
            sans: ["var(--font-inter)"],
        },
        extend: {
            colors: {
                "accent": "rgb(var(--accent) / <alpha-value>)",
                "accent-hover": "rgb(var(--accent-hover) / <alpha-value>)",
            },
        },
    },
    plugins: [
        plugin(
            function ({addBase}) {
                addBase({
                    "html[data-theme='light-red']": {
                        "--accent": toRGB(colors.rose[500]),
                        "--accent-hover": toRGB(colors.rose[700]),
                    },
                    "html[data-theme='light-orange']": {
                        "--accent": toRGB(colors.orange[500]),
                        "--accent-hover": toRGB(colors.orange[700]),
                    },
                    "html[data-theme='light-yellow']": {
                        "--accent": toRGB(colors.yellow[400]),
                        "--accent-hover": toRGB(colors.yellow[600]),
                    },
                    "html[data-theme='light-green']": {
                        "--accent": toRGB(colors.green[500]),
                        "--accent-hover": toRGB(colors.green[700]),
                    },
                    "html[data-theme='light-blue']": {
                        "--accent": toRGB(colors.blue[500]),
                        "--accent-hover": toRGB(colors.blue[700]),
                    },
                    "html[data-theme='light-purple']": {
                        "--accent": toRGB(colors.violet[500]),
                        "--accent-hover": toRGB(colors.violet[700]),
                    },
                    "html[data-theme='dark-red']": {
                        "--accent": toRGB(colors.rose[600]),
                        "--accent-hover": toRGB(colors.rose[800]),
                    },
                    "html[data-theme='dark-orange']": {
                        "--accent": toRGB(colors.orange[600]),
                        "--accent-hover": toRGB(colors.orange[800]),
                    },
                    "html[data-theme='dark-yellow']": {
                        "--accent": toRGB(colors.yellow[500]),
                        "--accent-hover": toRGB(colors.yellow[700]),
                    },
                    "html[data-theme='dark-green']": {
                        "--accent": toRGB(colors.green[600]),
                        "--accent-hover": toRGB(colors.green[800]),
                    },
                    "html[data-theme='dark-blue']": {
                        "--accent": toRGB(colors.blue[600]),
                        "--accent-hover": toRGB(colors.blue[800]),
                    },
                    "html[data-theme='dark-purple']": {
                        "--accent": toRGB(colors.violet[600]),
                        "--accent-hover": toRGB(colors.violet[800]),
                    },
                });
            },
        ),
    ],
};
