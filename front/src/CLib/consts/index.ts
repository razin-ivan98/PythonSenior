export type Size =
    "small" |
    "medium" |
    "large"

export type ColorVariant =
    "success" | 
    "warning" |
    "primary" |
    "danger" |
    "info" |
    "light" |
    "dark" |
    "link"

export const Colors: Record<ColorVariant, {common: string, inner?: string}> = {
    "success": {
        common: "#4bb34b",
        inner: "#fff"
    },
    "warning": {
        common: "#ffc107",
        inner: "#fff"
    },
    "primary": {
        common: "#4586cc",
        inner: "#fff"
    },
    "danger": {
        common: "#dc3545",
        inner: "#fff"
    },
    "info": {
        common: "#000"
    },
    "light": {
        common: "#000"
    },
    "dark": {
        common: "#000"
    },
    "link": {
        common: "#000"
    },
}
