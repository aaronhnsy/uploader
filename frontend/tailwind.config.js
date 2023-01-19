/** @type {import("tailwindcss").Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme:   {
	screens: {
	    "sm": "576px",
	    "md": "768px",
            "lg": "992px",
            "xl": "1200px",
	    "xxl": "1400px"	
	},
        extend: {},
    },
    plugins: [],
};
