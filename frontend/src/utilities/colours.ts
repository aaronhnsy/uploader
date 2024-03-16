import colors from "tailwindcss/colors";
import { parseColor } from "tailwindcss/lib/util/color";
import plugin from "tailwindcss/plugin";

export const modes: Record<string, Record<string, string>> = {
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
export const accents: Record<string, Record<string, Record<string, string>>> = {
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

export let cssSelectors: Record<string, Record<string, string>> = { ":root": {} };
export let customColours: Record<string, string> = {};
export let themeNames: string[] = [];

for (const mode in modes) {
    let modeSelector = `html[data-theme*="${mode}"]`;
    cssSelectors[modeSelector] = {};
    for (const [variant, value] of Object.entries(modes[mode])) {
        let themeModeVariant = `theme-${mode}-${variant}`;
        cssSelectors[":root"][`--${themeModeVariant}`] = parseColor(value).color.join(" ");
        customColours[themeModeVariant] = `rgb(var(--${themeModeVariant}) / <alpha-value>)`;
        let themeVariant = `theme-${variant}`;
        cssSelectors[modeSelector][`--${themeVariant}`] = `var(--${themeModeVariant})`;
        customColours[themeVariant] = `rgb(var(--${themeVariant}) / <alpha-value>)`;
    }
    for (const accent in accents) {
        let modeAccentSelector = `html[data-theme="${mode}-${accent}"]`;
        cssSelectors[modeAccentSelector] = {};
        for (const [variant, value] of Object.entries(accents[accent][mode])) {
            let themeModeAccentVariant = `theme-${mode}-${accent}-${variant}`;
            cssSelectors[":root"][`--${themeModeAccentVariant}`] = parseColor(value).color.join(" ");
            customColours[themeModeAccentVariant] = `rgb(var(--${themeModeAccentVariant}) / <alpha-value>)`;
            let themeVariant = `theme-${variant}`;
            cssSelectors[modeAccentSelector][`--${themeVariant}`] = `var(--${themeModeAccentVariant})`;
            customColours[themeVariant] = `rgb(var(--${themeVariant}) / <alpha-value>)`;
        }
        themeNames.push(`${mode}-${accent}`);
    }
}

export const coloursPlugin = plugin(
    function ({ addBase }) {
        addBase(cssSelectors);
    },
);
