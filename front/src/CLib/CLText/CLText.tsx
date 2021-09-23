import React from "react"
import { Size } from "../consts"
import styled from "styled-components"

const textSizes: Record<Size, {height: string, fontSize: string}> = {
    large: {height: "48px", fontSize: "24px"},
    medium: {height: "36px", fontSize: "16px"},
    small: {height: "24px", fontSize: "12px"}
}

const Wrapper = styled.span<Props>`
    color: gray;
    font-family: Arial;
    font-size: ${({size}) => textSizes[size].fontSize};
    text-align: ${({align}) => align};
`

interface Props {
    size?: Size
    align?: "left" | "right" | "center" | "justify"
}

export class CLText extends React.Component<Props> {
    render() {
        const {
            size = "medium",
            align = "justify"
        } = this.props

        return <Wrapper size={size} align={align}>{this.props.children}</Wrapper>
    }
}
