import colors from "tailwindcss/colors";
import { parseColor } from "tailwindcss/lib/util/color";
import plugin from "tailwindcss/plugin";
import type {
    AccentOptionsObject, AccentsObject, CSSRulesObject, CustomColours, ModeOptionsObject, ModesObject,
} from "./types";

const rgb = (color: string) => parseColor(color).color.join(" ");

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
} as const;

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
} as const;

export const modeOptions: ModeOptionsObject = {
    "light": "bg-theme-light-primary hover:bg-theme-light-primary-hover",
    "dark": "bg-theme-dark-primary hover:bg-theme-dark-primary-hover",
};
export const accentOptions: AccentOptionsObject = {
    "light": {
        "red": "bg-theme-light-red-accent hover:bg-theme-light-red-accent-hover",
        "orange": "bg-theme-light-orange-accent hover:bg-theme-light-orange-accent-hover",
        "yellow": "bg-theme-light-yellow-accent hover:bg-theme-light-yellow-accent-hover",
        "green": "bg-theme-light-green-accent hover:bg-theme-light-green-accent-hover",
        "blue": "bg-theme-light-blue-accent hover:bg-theme-light-blue-accent-hover",
        "purple": "bg-theme-light-purple-accent hover:bg-theme-light-purple-accent-hover",
    },
    "dark": {
        "red": "bg-theme-dark-red-accent hover:bg-theme-dark-red-accent-hover",
        "orange": "bg-theme-dark-orange-accent hover:bg-theme-dark-orange-accent-hover",
        "yellow": "bg-theme-dark-yellow-accent hover:bg-theme-dark-yellow-accent-hover",
        "green": "bg-theme-dark-green-accent hover:bg-theme-dark-green-accent-hover",
        "blue": "bg-theme-dark-blue-accent hover:bg-theme-dark-blue-accent-hover",
        "purple": "bg-theme-dark-purple-accent hover:bg-theme-dark-purple-accent-hover",
    },
};

const cssRules: CSSRulesObject = {
    ":root": {
        "--theme-light-primary": rgb(modes.light["primary"]),
        "--theme-light-primary-hover": rgb(modes.light["primary-hover"]),
        "--theme-light-secondary": rgb(modes.light["secondary"]),
        "--theme-light-secondary-hover": rgb(modes.light["secondary-hover"]),
        "--theme-light-tertiary": rgb(modes.light["tertiary"]),
        "--theme-light-tertiary-hover": rgb(modes.light["tertiary-hover"]),
        "--theme-light-text": rgb(modes.light["text"]),
        "--theme-light-text-hover": rgb(modes.light["text-hover"]),
        "--theme-dark-primary": rgb(modes.dark["primary"]),
        "--theme-dark-primary-hover": rgb(modes.dark["primary-hover"]),
        "--theme-dark-secondary": rgb(modes.dark["secondary"]),
        "--theme-dark-secondary-hover": rgb(modes.dark["secondary-hover"]),
        "--theme-dark-tertiary": rgb(modes.dark["tertiary"]),
        "--theme-dark-tertiary-hover": rgb(modes.dark["tertiary-hover"]),
        "--theme-dark-text": rgb(modes.dark["text"]),
        "--theme-dark-text-hover": rgb(modes.dark["text-hover"]),
        "--theme-light-red-accent": rgb(accents.red.light["accent"]),
        "--theme-light-red-accent-hover": rgb(accents.red.light["accent-hover"]),
        "--theme-dark-red-accent": rgb(accents.red.dark["accent"]),
        "--theme-dark-red-accent-hover": rgb(accents.red.dark["accent-hover"]),
        "--theme-light-orange-accent": rgb(accents.orange.light["accent"]),
        "--theme-light-orange-accent-hover": rgb(accents.orange.light["accent-hover"]),
        "--theme-dark-orange-accent": rgb(accents.orange.dark["accent"]),
        "--theme-dark-orange-accent-hover": rgb(accents.orange.dark["accent-hover"]),
        "--theme-light-yellow-accent": rgb(accents.yellow.light["accent"]),
        "--theme-light-yellow-accent-hover": rgb(accents.yellow.light["accent-hover"]),
        "--theme-dark-yellow-accent": rgb(accents.yellow.dark["accent"]),
        "--theme-dark-yellow-accent-hover": rgb(accents.yellow.dark["accent-hover"]),
        "--theme-light-green-accent": rgb(accents.green.light["accent"]),
        "--theme-light-green-accent-hover": rgb(accents.green.light["accent-hover"]),
        "--theme-dark-green-accent": rgb(accents.green.dark["accent"]),
        "--theme-dark-green-accent-hover": rgb(accents.green.dark["accent-hover"]),
        "--theme-light-blue-accent": rgb(accents.blue.light["accent"]),
        "--theme-light-blue-accent-hover": rgb(accents.blue.light["accent-hover"]),
        "--theme-dark-blue-accent": rgb(accents.blue.dark["accent"]),
        "--theme-dark-blue-accent-hover": rgb(accents.blue.dark["accent-hover"]),
        "--theme-light-purple-accent": rgb(accents.purple.light["accent"]),
        "--theme-light-purple-accent-hover": rgb(accents.purple.light["accent-hover"]),
        "--theme-dark-purple-accent": rgb(accents.purple.dark["accent"]),
        "--theme-dark-purple-accent-hover": rgb(accents.purple.dark["accent-hover"]),
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
    "theme-light-primary": "rgb(var(--theme-light-primary) / <alpha-value>)",
    "theme-light-primary-hover": "rgb(var(--theme-light-primary-hover) / <alpha-value>)",
    "theme-light-secondary": "rgb(var(--theme-light-secondary) / <alpha-value>)",
    "theme-light-secondary-hover": "rgb(var(--theme-light-secondary-hover) / <alpha-value>)",
    "theme-light-tertiary": "rgb(var(--theme-light-tertiary) / <alpha-value>)",
    "theme-light-tertiary-hover": "rgb(var(--theme-light-tertiary-hover) / <alpha-value>)",
    "theme-light-text": "rgb(var(--theme-light-text) / <alpha-value>)",
    "theme-light-text-hover": "rgb(var(--theme-light-text-hover) / <alpha-value>)",
    "theme-dark-primary": "rgb(var(--theme-dark-primary) / <alpha-value>)",
    "theme-dark-primary-hover": "rgb(var(--theme-dark-primary-hover) / <alpha-value>)",
    "theme-dark-secondary": "rgb(var(--theme-dark-secondary) / <alpha-value>)",
    "theme-dark-secondary-hover": "rgb(var(--theme-dark-secondary-hover) / <alpha-value>)",
    "theme-dark-tertiary": "rgb(var(--theme-dark-tertiary) / <alpha-value>)",
    "theme-dark-tertiary-hover": "rgb(var(--theme-dark-tertiary-hover) / <alpha-value>)",
    "theme-dark-text": "rgb(var(--theme-dark-text) / <alpha-value>)",
    "theme-dark-text-hover": "rgb(var(--theme-dark-text-hover) / <alpha-value>)",
    "theme-light-red-accent": "rgb(var(--theme-light-red-accent) / <alpha-value>)",
    "theme-light-red-accent-hover": "rgb(var(--theme-light-red-accent-hover) / <alpha-value>)",
    "theme-dark-red-accent": "rgb(var(--theme-dark-red-accent) / <alpha-value>)",
    "theme-dark-red-accent-hover": "rgb(var(--theme-dark-red-accent-hover) / <alpha-value>)",
    "theme-light-orange-accent": "rgb(var(--theme-light-orange-accent) / <alpha-value>)",
    "theme-light-orange-accent-hover": "rgb(var(--theme-light-orange-accent-hover) / <alpha-value>)",
    "theme-dark-orange-accent": "rgb(var(--theme-dark-orange-accent) / <alpha-value>)",
    "theme-dark-orange-accent-hover": "rgb(var(--theme-dark-orange-accent-hover) / <alpha-value>)",
    "theme-light-yellow-accent": "rgb(var(--theme-light-yellow-accent) / <alpha-value>)",
    "theme-light-yellow-accent-hover": "rgb(var(--theme-light-yellow-accent-hover) / <alpha-value>)",
    "theme-dark-yellow-accent": "rgb(var(--theme-dark-yellow-accent) / <alpha-value>)",
    "theme-dark-yellow-accent-hover": "rgb(var(--theme-dark-yellow-accent-hover) / <alpha-value>)",
    "theme-light-green-accent": "rgb(var(--theme-light-green-accent) / <alpha-value>)",
    "theme-light-green-accent-hover": "rgb(var(--theme-light-green-accent-hover) / <alpha-value>)",
    "theme-dark-green-accent": "rgb(var(--theme-dark-green-accent) / <alpha-value>)",
    "theme-dark-green-accent-hover": "rgb(var(--theme-dark-green-accent-hover) / <alpha-value>)",
    "theme-light-blue-accent": "rgb(var(--theme-light-blue-accent) / <alpha-value>)",
    "theme-light-blue-accent-hover": "rgb(var(--theme-light-blue-accent-hover) / <alpha-value>)",
    "theme-dark-blue-accent": "rgb(var(--theme-dark-blue-accent) / <alpha-value>)",
    "theme-dark-blue-accent-hover": "rgb(var(--theme-dark-blue-accent-hover) / <alpha-value>)",
    "theme-light-purple-accent": "rgb(var(--theme-light-purple-accent) / <alpha-value>)",
    "theme-light-purple-accent-hover": "rgb(var(--theme-light-purple-accent-hover) / <alpha-value>)",
    "theme-dark-purple-accent": "rgb(var(--theme-dark-purple-accent) / <alpha-value>)",
    "theme-dark-purple-accent-hover": "rgb(var(--theme-dark-purple-accent-hover) / <alpha-value>)",
};
