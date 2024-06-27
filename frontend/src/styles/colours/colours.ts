import colors from "tailwindcss/colors";
import { parseColor } from "tailwindcss/lib/util/color";
import type { AccentOptionsObject, AccentsObject, ModeOptionsObject, Modes, ModesObject, StringIndexObject } from "./types";

const rgb = (colour: string): string => parseColor(colour).color.join(" ");

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
        "subtext": colors.neutral[600],
        "subtext-hover": colors.neutral[700],
    },
    "dark": {
        "primary": colors.gray[600],
        "primary-hover": colors.gray[700],
        "secondary": colors.gray[700],
        "secondary-hover": colors.gray[800],
        "tertiary": colors.gray[800],
        "tertiary-hover": colors.gray[900],
        "text": colors.neutral[200],
        "text-hover": colors.neutral[300],
        "subtext": colors.neutral[400],
        "subtext-hover": colors.neutral[500],
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
    "pink": {
        "light": { "accent": colors.pink[500], "accent-hover": colors.pink[600] },
        "dark": { "accent": colors.pink[500], "accent-hover": colors.pink[600] },
    },
} as const;

function generateColours() {
    // object to store colours
    let cssRules: StringIndexObject = { ":root": {} };
    let tailwindColours: StringIndexObject = {};
    // generate mode colour variants
    for (const [mode, modeVariants] of Object.entries(modes)) {
        const modeSelector = `html[data-theme*='${mode}']`;
        cssRules[modeSelector] = {};
        for (const [variant, value] of Object.entries(modeVariants)) {
            const themeModeVariant = `colour-${mode}-${variant}`;
            cssRules[":root"][`--${themeModeVariant}`] = rgb(value);
            tailwindColours[themeModeVariant] = `rgb(var(--${themeModeVariant}) / <alpha-value>)`;
            const themeVariant = `colour-${variant}`;
            cssRules[modeSelector][`--${themeVariant}`] = `var(--${themeModeVariant})`;
            tailwindColours[themeVariant] = `rgb(var(--${themeVariant}) / <alpha-value>)`;
        }
        // generate accent colour variants
        for (const [accent, accentVariants] of Object.entries(accents)) {
            const modeAccentSelector = `html[data-theme='${mode}-${accent}']`;
            cssRules[modeAccentSelector] = {};
            for (const [variant, value] of Object.entries(accentVariants[mode as Modes])) {
                const themeModeAccentVariant = `colour-${mode}-${accent}-${variant}`;
                cssRules[":root"][`--${themeModeAccentVariant}`] = rgb(value);
                tailwindColours[themeModeAccentVariant] = `rgb(var(--${themeModeAccentVariant}) / <alpha-value>)`;
                const themeVariant = `colour-${variant}`;
                cssRules[modeAccentSelector][`--${themeVariant}`] = `var(--${themeModeAccentVariant})`;
                tailwindColours[themeVariant] = `rgb(var(--${themeVariant}) / <alpha-value>)`;
            }
        }
    }
    return [cssRules, tailwindColours];
}

export const [cssRules, tailwindColours] = generateColours();

export const modeOptions: ModeOptionsObject = {
    "light": "bg-colour-light-primary hover:bg-colour-light-primary-hover",
    "dark": "bg-colour-dark-primary hover:bg-colour-dark-primary-hover",
};
export const accentOptions: AccentOptionsObject = {
    "light": {
        "red": "bg-colour-light-red-accent hover:bg-colour-light-red-accent-hover",
        "orange": "bg-colour-light-orange-accent hover:bg-colour-light-orange-accent-hover",
        "yellow": "bg-colour-light-yellow-accent hover:bg-colour-light-yellow-accent-hover",
        "green": "bg-colour-light-green-accent hover:bg-colour-light-green-accent-hover",
        "blue": "bg-colour-light-blue-accent hover:bg-colour-light-blue-accent-hover",
        "purple": "bg-colour-light-purple-accent hover:bg-colour-light-purple-accent-hover",
        "pink": "bg-colour-light-pink-accent hover:bg-colour-light-pink-accent-hover",
    },
    "dark": {
        "red": "bg-colour-dark-red-accent hover:bg-colour-dark-red-accent-hover",
        "orange": "bg-colour-dark-orange-accent hover:bg-colour-dark-orange-accent-hover",
        "yellow": "bg-colour-dark-yellow-accent hover:bg-colour-dark-yellow-accent-hover",
        "green": "bg-colour-dark-green-accent hover:bg-colour-dark-green-accent-hover",
        "blue": "bg-colour-dark-blue-accent hover:bg-colour-dark-blue-accent-hover",
        "purple": "bg-colour-dark-purple-accent hover:bg-colour-dark-purple-accent-hover",
        "pink": "bg-colour-dark-pink-accent hover:bg-colour-dark-pink-accent-hover",
    },
};
