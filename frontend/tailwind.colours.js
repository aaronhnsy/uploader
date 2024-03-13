const colors = require("tailwindcss/colors");
const {parseColor} = require("tailwindcss/lib/util/color");

export const accentColours = {
    "red": {
        "light": {
            "main": colors.red[500],
            "hover": colors.red[600],
        },
        "dark": {
            "main": colors.red[500],
            "hover": colors.red[600],
        },
    },
    "orange": {
        "light": {
            "main": colors.orange[500],
            "hover": colors.orange[600],
        },
        "dark": {
            "main": colors.orange[600],
            "hover": colors.orange[700],
        },
    },
    "yellow": {
        "light": {
            "main": colors.yellow[500],
            "hover": colors.yellow[600],
        },
        "dark": {
            "main": colors.yellow[500],
            "hover": colors.yellow[600],
        },
    },
    "green": {
        "light": {
            "main": colors.green[500],
            "hover": colors.green[600],
        },
        "dark": {
            "main": colors.green[500],
            "hover": colors.green[600],
        },
    },
    "blue": {
        "light": {
            "main": colors.blue[500],
            "hover": colors.blue[600],
        },
        "dark": {
            "main": colors.blue[600],
            "hover": colors.blue[500],
        },
    },
    "purple": {
        "light": {
            "main": colors.purple[500],
            "hover": colors.purple[600],
        },
        "dark": {
            "main": colors.purple[500],
            "hover": colors.purple[600],
        },
    },
};

// This is a way-too-complicated way of converting the above object into
// a set of CSS selectors for the different accent colours, but it works
// and was a good learning experience for me, so it stays.

export const toRgb = (value) => parseColor(value).color.join(" ");

export const accentColourHtmlSelectors = Object.entries(accentColours).reduce(
    (acc, [colour, themes]) => {
        return {
            ...acc,
            ...Object.entries(themes).reduce(
                (themeAcc, [theme, variations]) => {
                    return {
                        ...themeAcc,
                        [`html[data-theme='${theme}-${colour}']`]: {
                            "--theme-accent": toRgb(variations.main),
                            "--theme-accent-hover": toRgb(variations.hover),
                        },
                    };
                }, {},
            ),
        };
    }, {},
);
