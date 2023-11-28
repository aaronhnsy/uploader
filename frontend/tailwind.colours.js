const colors = require("tailwindcss/colors");
const {parseColor} = require("tailwindcss/lib/util/color");

export const accentColours = {
    "red": {
        "light": {
            "normal": colors.red[500],
            "hover": colors.red[600],
        },
        "dark": {
            "normal": colors.red[500],
            "hover": colors.red[600],
        },
    },
    "orange": {
        "light": {
            "normal": colors.orange[500],
            "hover": colors.orange[600],
        },
        "dark": {
            "normal": colors.orange[400],
            "hover": colors.orange[500],
        },
    },
    "yellow": {
        "light": {
            "normal": colors.yellow[500],
            "hover": colors.yellow[600],
        },
        "dark": {
            "normal": colors.yellow[400],
            "hover": colors.yellow[500],
        },
    },
    "green": {
        "light": {
            "normal": colors.green[500],
            "hover": colors.green[600],
        },
        "dark": {
            "normal": colors.green[400],
            "hover": colors.green[500],
        },
    },
    "blue": {
        "light": {
            "normal": colors.blue[500],
            "hover": colors.blue[600],
        },
        "dark": {
            "normal": colors.blue[400],
            "hover": colors.blue[500],
        },
    },
    "purple": {
        "light": {
            "normal": colors.purple[500],
            "hover": colors.purple[600],
        },
        "dark": {
            "normal": colors.purple[400],
            "hover": colors.purple[500],
        },
    },
};

// This is way too complicated, but it makes me look like I know
// what I'm doing, so I'm going to leave it for now.

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
                            "--accent-normal": toRgb(variations.normal),
                            "--accent-hover": toRgb(variations.hover),
                        },
                    };
                }, {},
            ),
        };
    }, {},
);
