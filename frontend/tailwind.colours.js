const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const { parseColor } = require("tailwindcss/lib/util/color");

const toRGB = (value) => parseColor(value).color.join(" ");

const themes = {
    "light": {
        "primary": colors.neutral[100],
        "primary-hover": colors.neutral[200],
        "secondary": colors.neutral[200],
        "secondary-hover": colors.neutral[300],
        "tertiary": colors.neutral[300],
        "tertiary-hover": colors.neutral[400],
        "text": colors.neutral[800],
        "text-hover": colors.neutral[900],
        "red": {
            "accent": colors.red[500],
            "accent-hover": colors.red[600],
        },
        "orange": {
            "accent": colors.orange[500],
            "accent-hover": colors.orange[600],
        },
        "yellow": {
            "accent": colors.yellow[500],
            "accent-hover": colors.yellow[600],
        },
        "green": {
            "accent": colors.green[500],
            "accent-hover": colors.green[600],
        },
        "blue": {
            "accent": colors.blue[500],
            "accent-hover": colors.blue[600],
        },
        "purple": {
            "accent": colors.purple[500],
            "accent-hover": colors.purple[600],
        },
    },
    "dark": {
        "primary": colors.gray[700],
        "primary-hover": colors.gray[800],
        "secondary": colors.gray[800],
        "secondary-hover": colors.gray[900],
        "tertiary": colors.gray[900],
        "tertiary-hover": colors.gray[950],
        "text": colors.neutral[200],
        "text-hover": colors.neutral[300],
        "red": {
            "accent": colors.red[500],
            "accent-hover": colors.red[600],
        },
        "orange": {
            "accent": colors.orange[600],
            "accent-hover": colors.orange[700],
        },
        "yellow": {
            "accent": colors.yellow[500],
            "accent-hover": colors.yellow[600],
        },
        "green": {
            "accent": colors.green[500],
            "accent-hover": colors.green[600],
        },
        "blue": {
            "accent": colors.blue[500],
            "accent-hover": colors.blue[600],
        },
        "purple": {
            "accent": colors.purple[500],
            "accent-hover": colors.purple[600],
        },
    },
};

let selectors = {};
for (const theme in themes) {
    for (const colour in themes[theme]) {
        if (typeof themes[theme][colour] === "object") {
            selectors[`html[data-theme='${theme}-${colour}']`] = {
                "--theme-accent": toRGB(themes[theme][colour]["accent"]),
                "--theme-accent-hover": toRGB(themes[theme][colour]["accent-hover"]),
            };
        } else {
            let selector = `html[data-theme*='${theme}']`;
            if (selectors.hasOwnProperty(selector) === true) {
                selectors[selector][`--theme-${colour}`] = toRGB(themes[theme][colour]);
            } else {
                selectors[selector] = { [`--theme-${colour}`]: toRGB(themes[theme][colour]) };
            }
        }
    }
}

export const customColourPlugin = plugin(
    function ({ addBase }) {
        addBase(selectors);
    }
);
