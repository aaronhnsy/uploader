export type Modes =
    `light` | `dark`;
export type Accents =
    `red` | `orange` | `yellow` | `green` | `blue` | `purple` | `pink`;
type ModeVariants =
    `main-100` | `main-200` | `main-300` | `main-400` | `main-500` |
    `text` | `text-hover` | `subtext` | `subtext-hover`;
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
    [M in Modes]: `bg-colour-${M}-main-100 hover:bg-colour-${M}-main-200`
};
export type AccentOptionsObject = {
    [M in Modes]: {
        [A in Accents]: `bg-colour-${M}-${A}-accent hover:bg-colour-${M}-${A}-accent-hover`
    }
};

export type StringIndexObject = { [index: string]: any };
