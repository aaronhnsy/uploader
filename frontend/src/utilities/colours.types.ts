interface ModeVariants {
    [key: string]: string;
    "primary": string;
    "primary-hover": string;
    "secondary": string;
    "secondary-hover": string;
    "tertiary": string;
    "tertiary-hover": string;
    "text": string;
    "text-hover": string;
}
interface AccentVariants {
    [key: string]: string;
    "accent": string;
    "accent-hover": string;
}
interface _Modes<T extends ModeVariants | AccentVariants> {
    [key: string]: T;
    "light": T;
    "dark": T;
}

export type Modes = _Modes<ModeVariants>
export interface Accents {
    [key: string]: _Modes<AccentVariants>;
    "red": _Modes<AccentVariants>;
    "orange": _Modes<AccentVariants>;
    "yellow": _Modes<AccentVariants>;
    "green": _Modes<AccentVariants>;
    "blue": _Modes<AccentVariants>;
    "purple": _Modes<AccentVariants>;
}
