const { customColours, coloursPlugin } = require("./src/styles/colours");

/** @type {import("tailwindcss").Config} **/
module.exports = {
    content: ["./src/**/*.{ts,tsx}"],
    theme: {
        fontFamily: { sans: ["var(--font-inter)"] },
        extend: { colors: customColours },
    },
    plugins: [coloursPlugin],
};
