declare module "tailwindcss/lib/util/color" {
    export function parseColor(color: string): { color: number[]; alpha: number };
}
