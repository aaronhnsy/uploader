export type Modes =
    `light` | `dark`;
export type Accents =
    `red` | `orange` | `yellow` | `green` | `blue` | `purple`;
type ModeVariants =
    `primary` | `primary-hover` | `secondary` | `secondary-hover` | `tertiary` | `tertiary-hover` |
    `text` | `text-hover`;
type AccentVariants =
    `accent` | `accent-hover`;

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

export type StringIndexObject = { [index: string]: any };
