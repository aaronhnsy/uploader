type ModeVariants =
    `primary` | `primary-hover`
    | `secondary` | `secondary-hover`
    | `tertiary` | `tertiary-hover`
    | `text` | `text-hover`;
type ModeVariantsObject = {
    [Key in ModeVariants]: string;
}
type Modes = `light` | `dark`;
export type ModesObject<T extends ModeVariantsObject | AccentVariantsObject = ModeVariantsObject> = {
    [Key in Modes]: T;
}

type AccentVariants = `accent` | `accent-hover`;
type AccentVariantsObject = {
    [Key in AccentVariants]: string;
}
type Accents = `red` | `orange` | `yellow` | `green` | `blue` | `purple`;
export type AccentsObject = {
    [Key in Accents]: ModesObject<AccentVariantsObject>;
}

type Themes = `${Modes}-${Accents}`;

type ModeOptions = `${Modes}`
type ModeOptionsClasses<M extends Modes> = `bg-theme-${M}-primary hover:bg-theme-${M}-primary-hover`
export type ModeOptionsObject = {
    [M in ModeOptions]: ModeOptionsClasses<M>
};
type AccentOptions = `${Modes}-${Accents}`
type AccentOptionsClasses<AO extends AccentOptions> = `bg-theme-${AO}-accent hover:bg-theme-${AO}-accent-hover`
export type AccentOptionsObject = {
    [AO in AccentOptions]: AccentOptionsClasses<AO>
};

type SpecificModeVariantVariables<M extends Modes = Modes, MV extends ModeVariants = ModeVariants> = `--theme-${M}-${MV}`
type SpecificThemeVariantVariables<T extends Themes = Themes, AV extends AccentVariants = AccentVariants> = `--theme-${T}-${AV}`
type SpecificVariantVariables = SpecificModeVariantVariables | SpecificThemeVariantVariables
type RootCSSRulesObject = {
    ":root": {
        [Variant in SpecificVariantVariables]: string;
    }
}

type ModeSelectors<M extends Modes> = `html[data-theme*='${M}']`;
type ModeVariantVariables<MV extends ModeVariants> = `--theme-${MV}`
type ModeCSSRulesObject = {
    [M in Modes as ModeSelectors<M>]: {
        [MV in ModeVariants as ModeVariantVariables<MV>]: `var(${SpecificModeVariantVariables<M, MV>})`
    }
}

type ThemeSelectors<T extends Themes> = `html[data-theme='${T}']`
type AccentVariantVariables<AV extends AccentVariants> = `--theme-${AV}`
type ThemeCSSRulesObject = {
    [T in Themes as ThemeSelectors<T>]: {
        [AV in AccentVariants as AccentVariantVariables<AV>]: `var(${SpecificThemeVariantVariables<T, AV>})`
    }
}

export type CSSRulesObject = RootCSSRulesObject & ModeCSSRulesObject & ThemeCSSRulesObject;

type ModeVariantCustomColours = {
    [MV in ModeVariants as `theme-${MV}`]: `rgb(var(${ModeVariantVariables<MV>}) / <alpha-value>)`
}
type AccentVariantCustomColours = {
    [AV in AccentVariants as `theme-${AV}`]: `rgb(var(${AccentVariantVariables<AV>}) / <alpha-value>)`
}
type ThemeCustomColours = ModeVariantCustomColours & AccentVariantCustomColours



export type CustomColours = ThemeCustomColours
