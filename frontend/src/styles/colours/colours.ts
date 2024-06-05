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

function generateColours() {
    // object to store colours
    let cssRules: StringIndexObject = { ":root": {} };
    let tailwindColours: StringIndexObject = {};
    // generate mode colour variants
    for (const [mode, modeVariants] of Object.entries(modes)) {
        const modeSelector = `html[data-theme*='${mode}']`;
        cssRules[modeSelector] = {};
        for (const [variant, value] of Object.entries(modeVariants)) {
            const themeModeVariant = `theme-${mode}-${variant}`;
            cssRules[":root"][`--${themeModeVariant}`] = rgb(value);
            tailwindColours[themeModeVariant] = `rgb(var(--${themeModeVariant}) / <alpha-value>)`;
            const themeVariant = `theme-${variant}`;
            cssRules[modeSelector][`--${themeVariant}`] = `var(--${themeModeVariant})`;
            tailwindColours[themeVariant] = `rgb(var(--${themeVariant}) / <alpha-value>)`;
        }
        // generate accent colour variants
        for (const [accent, accentVariants] of Object.entries(accents)) {
            const modeAccentSelector = `html[data-theme='${mode}-${accent}']`;
            cssRules[modeAccentSelector] = {};
            for (const [variant, value] of Object.entries(accentVariants[mode as Modes])) {
                const themeModeAccentVariant = `theme-${mode}-${accent}-${variant}`;
                cssRules[":root"][`--${themeModeAccentVariant}`] = rgb(value);
                tailwindColours[themeModeAccentVariant] = `rgb(var(--${themeModeAccentVariant}) / <alpha-value>)`;
                const themeVariant = `theme-${variant}`;
                cssRules[modeAccentSelector][`--${themeVariant}`] = `var(--${themeModeAccentVariant})`;
                tailwindColours[themeVariant] = `rgb(var(--${themeVariant}) / <alpha-value>)`;
            }
        }
    }
    return [cssRules, tailwindColours];
}

export const [cssRules, tailwindColours] = generateColours();

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
