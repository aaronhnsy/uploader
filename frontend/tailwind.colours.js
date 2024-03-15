const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const { parseColor } = require("tailwindcss/lib/util/color");

const toRGB = (value) => parseColor(value).color.join(" ");

const modes = {
    "light": {
        "primary": colors.neutral[100],
        "primary-hover": colors.neutral[200],
        "secondary": colors.neutral[200],
        "secondary-hover": colors.neutral[300],
        "tertiary": colors.neutral[300],
        "tertiary-hover": colors.neutral[400],
        "text": colors.neutral[800],
        "text-hover": colors.neutral[900],
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
    },
};
const accents = {
    "red": {
        "light": { "accent": colors.red[500], "accent-hover": colors.red[600] },
        "dark": { "accent": colors.red[500], "accent-hover": colors.red[600] },
    },
    "orange": {
        "light": { "accent": colors.orange[500], "accent-hover": colors.orange[600] },
        "dark": { "accent": colors.orange[500], "accent-hover": colors.orange[600] },
    },
    "yellow": {
        "light": { "accent": colors.yellow[500], "accent-hover": colors.yellow[600] },
        "dark": { "accent": colors.yellow[500], "accent-hover": colors.yellow[600] },
    },
    "green": {
        "light": { "accent": colors.green[500], "accent-hover": colors.green[600] },
        "dark": { "accent": colors.green[500], "accent-hover": colors.green[600] },
    },
    "blue": {
        "light": { "accent": colors.blue[500], "accent-hover": colors.blue[600] },
        "dark": { "accent": colors.blue[500], "accent-hover": colors.blue[600] },
    },
    "purple": {
        "light": { "accent": colors.purple[500], "accent-hover": colors.purple[600] },
        "dark": { "accent": colors.purple[500], "accent-hover": colors.purple[600] },
    },
};

let selectors = {};
let themeNames = ["system"];

for (const mode in modes) {
    let fuzzyModeSelector = `html[data-theme*="${mode}"]`;
    selectors[fuzzyModeSelector] = {};
    for (const [key, value] of Object.entries(modes[mode])) {
        selectors[fuzzyModeSelector][`--theme-${key}`] = toRGB(value);
    }

    let strictModeSelector = `html[data-theme="${mode}"]`;
    selectors[strictModeSelector] = {};
    for (const [key, value] of Object.entries(accents.yellow[mode])) {
        selectors[strictModeSelector][`--theme-${key}`] = toRGB(value);
    }

    for (const accent in accents) {
        let strictAccentSelector = `html[data-theme="${mode}-${accent}"]`;
        selectors[strictAccentSelector] = {};
        for (const [key, value] of Object.entries(accents[accent][mode])) {
            selectors[strictAccentSelector][`--theme-${key}`] = toRGB(value);
        }
        themeNames.push(`${mode}-${accent}`);
    }
}

const coloursPlugin = plugin(
    function ({ addBase }) {
        addBase(selectors);
    },
);

module.exports = {
    modes,
    accents,
    themeNames,
    coloursPlugin,
};
