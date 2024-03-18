type ModeVariants =
    `primary` | `primary-hover` | `secondary` | `secondary-hover` | `tertiary` | `tertiary-hover` |
    `text` | `text-hover`;
type ModeVariantsObject = {
    [MV in ModeVariants]: string
}
type Modes = `light` | `dark`;
export type ModesObject<T extends ModeVariantsObject | AccentVariantsObject = ModeVariantsObject> = {
    [M in Modes]: T
}

type AccentVariants = `accent` | `accent-hover`;
type AccentVariantsObject = {
    [AV in AccentVariants]: string
}
type Accents = `red` | `orange` | `yellow` | `green` | `blue` | `purple`;
export type AccentsObject = {
    [A in Accents]: ModesObject<AccentVariantsObject>
}

type Themes = `${Modes}-${Accents}`;

type ModeOptionClasses<M extends Modes> = `bg-theme-${M}-primary hover:bg-theme-${M}-primary-hover`
export type ModeOptionsObject = {
    [M in Modes]: ModeOptionClasses<M>
};
type AccentOptionClasses<T extends Themes> = `bg-theme-${T}-accent hover:bg-theme-${T}-accent-hover`
export type AccentOptionsObject = {
    [T in Themes]: AccentOptionClasses<T>
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
    [SMV in `theme-${Modes}-${ModeVariants}`]: `rgb(var(--${SMV}) / <alpha-value>)`
} & {
    [SAV in `theme-${Themes}-${AccentVariants}`]: `rgb(var(--${SAV}) / <alpha-value>)`
} & {
    [MV in `theme-${ModeVariants}`]: `rgb(var(--${MV}) / <alpha-value>)`
} & {
    [AV in `theme-${AccentVariants}`]: `rgb(var(--${AV}) / <alpha-value>)`
}
