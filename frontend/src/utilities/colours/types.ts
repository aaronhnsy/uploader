export type Modes = `light` | `dark`;
export type Accents = `red` | `orange` | `yellow` | `green` | `blue` | `purple`;
type Themes = `${Modes}-${Accents}`;
type ModeVariants =
    `primary` | `primary-hover` | `secondary` | `secondary-hover` | `tertiary` | `tertiary-hover` |
    `text` | `text-hover`;
type AccentVariants = `accent` | `accent-hover`;

type ModeVariantsObject = {
    [MV in ModeVariants]: string
}
type AccentVariantsObject = {
    [AV in AccentVariants]: string
}
export type ModesObject<V extends ModeVariantsObject | AccentVariantsObject = ModeVariantsObject> = {
    [M in Modes]: V
}
export type AccentsObject = {
    [A in Accents]: ModesObject<AccentVariantsObject>
}

export type ModeOptionsObject = {
    [M in Modes]: `bg-theme-${M}-primary hover:bg-theme-${M}-primary-hover`
};
export type AccentOptionsObject = {
    [M in Modes]: {
        [A in Accents]: `bg-theme-${M}-${A}-accent hover:bg-theme-${M}-${A}-accent-hover`
    }
};

export type CSSRulesObject = {
    ":root": {
        [SV in `--theme-${`${Modes}-${ModeVariants}` | `${Themes}-${AccentVariants}`}`]: string;
    }
} & {
    [M in Modes as `html[data-theme*='${M}']`]: {
        [MV in ModeVariants as `--theme-${MV}`]: `var(--theme-${M}-${MV})`
    }
} & {
    [T in Themes as `html[data-theme='${T}']`]: {
        [AV in AccentVariants as `--theme-${AV}`]: `var(--theme-${T}-${AV})`
    }
}

export type CustomColours = {
    [MV in `theme-${Modes}-${ModeVariants}`]: `rgb(var(--${MV}) / <alpha-value>)`
} & {
    [AV in `theme-${Themes}-${AccentVariants}`]: `rgb(var(--${AV}) / <alpha-value>)`
} & {
    [MV in `theme-${ModeVariants}`]: `rgb(var(--${MV}) / <alpha-value>)`
} & {
    [AV in `theme-${AccentVariants}`]: `rgb(var(--${AV}) / <alpha-value>)`
}
