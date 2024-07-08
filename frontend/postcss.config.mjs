/** @type {import("postcss-load-config").Config} **/
const postcssConfig = {
    plugins: {
        "tailwindcss": {},
        "tailwindcss/nesting": {},
        "autoprefixer": {},
    },
};
export default postcssConfig;
