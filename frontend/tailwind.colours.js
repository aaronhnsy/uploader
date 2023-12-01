const colors = require("tailwindcss/colors");
const {parseColor} = require("tailwindcss/lib/util/color");

export const accentColours = {
    "red": {
        "light": {
            "primary": colors.red[500],
            "secondary": colors.red[600],
        },
        "dark": {
            "primary": colors.red[500],
            "secondary": colors.red[600],
        },
    },
    "orange": {
        "light": {
            "primary": colors.orange[500],
            "secondary": colors.orange[600],
        },
        "dark": {
            "primary": colors.orange[500],
            "secondary": colors.orange[600],
        },
    },
    "yellow": {
        "light": {
            "primary": colors.yellow[500],
            "secondary": colors.yellow[600],
        },
        "dark": {
            "primary": colors.yellow[400],
            "secondary": colors.yellow[500],
        },
    },
    "green": {
        "light": {
            "primary": colors.green[500],
            "secondary": colors.green[600],
        },
        "dark": {
            "primary": colors.green[400],
            "secondary": colors.green[500],
        },
    },
    "blue": {
        "light": {
            "primary": colors.blue[500],
            "secondary": colors.blue[600],
        },
        "dark": {
            "primary": colors.blue[500],
            "secondary": colors.blue[600],
        },
    },
    "purple": {
        "light": {
            "primary": colors.purple[500],
            "secondary": colors.purple[600],
        },
        "dark": {
            "primary": colors.purple[500],
            "secondary": colors.purple[600],
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
                            "--colour-accent-primary": toRgb(variations.primary),
                            "--colour-accent-secondary": toRgb(variations.secondary),
                        },
                    };
                }, {},
            ),
        };
    }, {},
);
