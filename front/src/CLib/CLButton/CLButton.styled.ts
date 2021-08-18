import styled from "styled-components"
import { Colors, ColorVariant, Size } from "../consts";

interface Props {
    variant: ColorVariant,
    size: Size
    width?: "full" | "auto" | number
}

const buttonSizes: Record<Size, {height: string, fontSize: string}> = {
    large: {height: "48px", fontSize: "24px"},
    medium: {height: "36px", fontSize: "16px"},
    small: {height: "24px", fontSize: "12px"}
}

export const Wrapper = styled.button<Props>`
    background-color: ${({variant}) => Colors[variant].common};
    color: ${({variant}) => Colors[variant].inner};
    height: ${({size}) => buttonSizes[size].height};
    font-size: ${({size}) => buttonSizes[size].fontSize};
    border: none;
    border-radius: 5px;
    font-family: Arial;
    font-weight: bold;
    width: ${({width}) => {
        if (width === "full") return "100%"
        else if (!width || width === "auto") return "unset"
        else return width + "px"
    }};
    padding: 0 1em;
`
