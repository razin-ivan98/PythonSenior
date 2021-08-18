import { observable } from "mobx"
import styled from "styled-components"
import { Size } from "../consts"

type Props = {
    inputSize: Size
    width?: "full" | "auto" | number
}

const inputSizes: Record<Size, {height: string, fontSize: string}> = {
    large: {height: "48px", fontSize: "24px"},
    medium: {height: "36px", fontSize: "16px"},
    small: {height: "24px", fontSize: "12px"}
}

export const InputWrapper = styled.input<Props>`
    outline: none;
    border: 1px solid #d5d5d7;
    border-radius: 5px;
    background-color: #f2f3f0;
    color: #818c95;
    padding: 0 1em;
    height: ${({inputSize}) => inputSizes[inputSize].height};
    font-size: ${({inputSize}) => inputSizes[inputSize].fontSize};
    width: ${({width}) => {
        if (width === "full") return "100%"
        else if (!width || width === "auto") return "unset"
        else return width + "px"
    }};
`
