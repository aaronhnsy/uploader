import colors from "tailwindcss/colors";
import { parseColor } from "tailwindcss/lib/util/color";
import plugin from "tailwindcss/plugin";
import {
    AccentOptionsObject,
    AccentsObject,
    CSSRulesObject,
    CustomColours,
    ModeOptionsObject,
    ModesObject,
} from "./colours.types";

export const modes: ModesObject = {
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
export const accents: AccentsObject = {
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

export const modeOptions: ModeOptionsObject = {
    "light": "bg-theme-light-primary hover:bg-theme-light-primary-hover",
    "dark": "bg-theme-dark-primary hover:bg-theme-dark-primary-hover",
};
export const accentOptions: AccentOptionsObject = {
    "light-red": "bg-theme-light-red-accent hover:bg-theme-light-red-accent-hover",
    "dark-red": "bg-theme-dark-red-accent hover:bg-theme-dark-red-accent-hover",
    "light-orange": "bg-theme-light-orange-accent hover:bg-theme-light-orange-accent-hover",
    "dark-orange": "bg-theme-dark-orange-accent hover:bg-theme-dark-orange-accent-hover",
    "light-yellow": "bg-theme-light-yellow-accent hover:bg-theme-light-yellow-accent-hover",
    "dark-yellow": "bg-theme-dark-yellow-accent hover:bg-theme-dark-yellow-accent-hover",
    "light-green": "bg-theme-light-green-accent hover:bg-theme-light-green-accent-hover",
    "dark-green": "bg-theme-dark-green-accent hover:bg-theme-dark-green-accent-hover",
    "light-blue": "bg-theme-light-blue-accent hover:bg-theme-light-blue-accent-hover",
    "dark-blue": "bg-theme-dark-blue-accent hover:bg-theme-dark-blue-accent-hover",
    "light-purple": "bg-theme-light-purple-accent hover:bg-theme-light-purple-accent-hover",
    "dark-purple": "bg-theme-dark-purple-accent hover:bg-theme-dark-purple-accent-hover",
};

const toRGB = (color: string) => parseColor(color).color.join(" ");
const cssRules: CSSRulesObject = {
    ":root": {
        "--theme-light-primary": toRGB(modes.light["primary"]),
        "--theme-light-primary-hover": toRGB(modes.light["primary-hover"]),
        "--theme-light-secondary": toRGB(modes.light["secondary"]),
        "--theme-light-secondary-hover": toRGB(modes.light["secondary-hover"]),
        "--theme-light-tertiary": toRGB(modes.light["tertiary"]),
        "--theme-light-tertiary-hover": toRGB(modes.light["tertiary-hover"]),
        "--theme-light-text": toRGB(modes.light["text"]),
        "--theme-light-text-hover": toRGB(modes.light["text-hover"]),
        "--theme-dark-primary": toRGB(modes.dark["primary"]),
        "--theme-dark-primary-hover": toRGB(modes.dark["primary-hover"]),
        "--theme-dark-secondary": toRGB(modes.dark["secondary"]),
        "--theme-dark-secondary-hover": toRGB(modes.dark["secondary-hover"]),
        "--theme-dark-tertiary": toRGB(modes.dark["tertiary"]),
        "--theme-dark-tertiary-hover": toRGB(modes.dark["tertiary-hover"]),
        "--theme-dark-text": toRGB(modes.dark["text"]),
        "--theme-dark-text-hover": toRGB(modes.dark["text-hover"]),
        "--theme-light-red-accent": toRGB(accents.red.light["accent"]),
        "--theme-light-red-accent-hover": toRGB(accents.red.light["accent-hover"]),
        "--theme-dark-red-accent": toRGB(accents.red.dark["accent"]),
        "--theme-dark-red-accent-hover": toRGB(accents.red.dark["accent-hover"]),
        "--theme-light-orange-accent": toRGB(accents.orange.light["accent"]),
        "--theme-light-orange-accent-hover": toRGB(accents.orange.light["accent-hover"]),
        "--theme-dark-orange-accent": toRGB(accents.orange.dark["accent"]),
        "--theme-dark-orange-accent-hover": toRGB(accents.orange.dark["accent-hover"]),
        "--theme-light-yellow-accent": toRGB(accents.yellow.light["accent"]),
        "--theme-light-yellow-accent-hover": toRGB(accents.yellow.light["accent-hover"]),
        "--theme-dark-yellow-accent": toRGB(accents.yellow.dark["accent"]),
        "--theme-dark-yellow-accent-hover": toRGB(accents.yellow.dark["accent-hover"]),
        "--theme-light-green-accent": toRGB(accents.green.light["accent"]),
        "--theme-light-green-accent-hover": toRGB(accents.green.light["accent-hover"]),
        "--theme-dark-green-accent": toRGB(accents.green.dark["accent"]),
        "--theme-dark-green-accent-hover": toRGB(accents.green.dark["accent-hover"]),
        "--theme-light-blue-accent": toRGB(accents.blue.light["accent"]),
        "--theme-light-blue-accent-hover": toRGB(accents.blue.light["accent-hover"]),
        "--theme-dark-blue-accent": toRGB(accents.blue.dark["accent"]),
        "--theme-dark-blue-accent-hover": toRGB(accents.blue.dark["accent-hover"]),
        "--theme-light-purple-accent": toRGB(accents.purple.light["accent"]),
        "--theme-light-purple-accent-hover": toRGB(accents.purple.light["accent-hover"]),
        "--theme-dark-purple-accent": toRGB(accents.purple.dark["accent"]),
        "--theme-dark-purple-accent-hover": toRGB(accents.purple.dark["accent-hover"]),
    },
    "html[data-theme*='light']": {
        "--theme-primary": "var(--theme-light-primary)",
        "--theme-primary-hover": "var(--theme-light-primary-hover)",
        "--theme-secondary": "var(--theme-light-secondary)",
        "--theme-secondary-hover": "var(--theme-light-secondary-hover)",
        "--theme-tertiary": "var(--theme-light-tertiary)",
        "--theme-tertiary-hover": "var(--theme-light-tertiary-hover)",
        "--theme-text": "var(--theme-light-text)",
        "--theme-text-hover": "var(--theme-light-text-hover)",
    },
    "html[data-theme*='dark']": {
        "--theme-primary": "var(--theme-dark-primary)",
        "--theme-primary-hover": "var(--theme-dark-primary-hover)",
        "--theme-secondary": "var(--theme-dark-secondary)",
        "--theme-secondary-hover": "var(--theme-dark-secondary-hover)",
        "--theme-tertiary": "var(--theme-dark-tertiary)",
        "--theme-tertiary-hover": "var(--theme-dark-tertiary-hover)",
        "--theme-text": "var(--theme-dark-text)",
        "--theme-text-hover": "var(--theme-dark-text-hover)",
    },
    "html[data-theme='light-red']": {
        "--theme-accent": "var(--theme-light-red-accent)",
        "--theme-accent-hover": "var(--theme-light-red-accent-hover)",
    },
    "html[data-theme='dark-red']": {
        "--theme-accent": "var(--theme-dark-red-accent)",
        "--theme-accent-hover": "var(--theme-dark-red-accent-hover)",
    },
    "html[data-theme='light-orange']": {
        "--theme-accent": "var(--theme-light-orange-accent)",
        "--theme-accent-hover": "var(--theme-light-orange-accent-hover)",
    },
    "html[data-theme='dark-orange']": {
        "--theme-accent": "var(--theme-dark-orange-accent)",
        "--theme-accent-hover": "var(--theme-dark-orange-accent-hover)",
    },
    "html[data-theme='light-yellow']": {
        "--theme-accent": "var(--theme-light-yellow-accent)",
        "--theme-accent-hover": "var(--theme-light-yellow-accent-hover)",
    },
    "html[data-theme='dark-yellow']": {
        "--theme-accent": "var(--theme-dark-yellow-accent)",
        "--theme-accent-hover": "var(--theme-dark-yellow-accent-hover)",
    },
    "html[data-theme='light-green']": {
        "--theme-accent": "var(--theme-light-green-accent)",
        "--theme-accent-hover": "var(--theme-light-green-accent-hover)",
    },
    "html[data-theme='dark-green']": {
        "--theme-accent": "var(--theme-dark-green-accent)",
        "--theme-accent-hover": "var(--theme-dark-green-accent-hover)",
    },
    "html[data-theme='light-blue']": {
        "--theme-accent": "var(--theme-light-blue-accent)",
        "--theme-accent-hover": "var(--theme-light-blue-accent-hover)",
    },
    "html[data-theme='dark-blue']": {
        "--theme-accent": "var(--theme-dark-blue-accent)",
        "--theme-accent-hover": "var(--theme-dark-blue-accent-hover)",
    },
    "html[data-theme='light-purple']": {
        "--theme-accent": "var(--theme-light-purple-accent)",
        "--theme-accent-hover": "var(--theme-light-purple-accent-hover)",
    },
    "html[data-theme='dark-purple']": {
        "--theme-accent": "var(--theme-dark-purple-accent)",
        "--theme-accent-hover": "var(--theme-dark-purple-accent-hover)",
    },
};
export const coloursPlugin = plugin(function ({ addBase }) {
    addBase(cssRules);
});

export const customColours: CustomColours = {
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
};
