import * as React from "react"
import styled from "styled-components"
import { Size } from "../consts"

const Wrapper = styled.div<Props>`
    display: flex;
    flex-direction: ${({direction}) => direction};
    overflow: hidden;
    & :last-child {
        margin: 0;
    }
    & > * {
        ${({direction}) => direction === "column" ? "margin-bottom: 1em" : "margin-left: 1em"};
    };
`

const ItemWrapper = styled.div<ItemProps>`
    flex-grow: ${({noGrow}) => noGrow ? 0 : 1};
    flex-shrink: ${({noShrink}) => noShrink ? 0 : 1};
`

interface Props {
    direction?: "column" | "row",
    width?: "auto" | "full",
    margin?: Size
}

export const CLFlex: React.FC<Props> = (props) => {
    const {
        children,
        direction = "row",
        width = "full",
        margin = "medium",
        ...otherProps
    } = props

    return <Wrapper
        direction={direction}
        width={width}
        margin={margin}
        {...otherProps}
    >
        {children}
    </Wrapper>
}

interface ItemProps {
    noGrow?: boolean
    noShrink?: boolean
}

export const CLFlexItem: React.FC<ItemProps> = (props) => {
    const {
        children,
        ...otherProps
    } = props
    return <ItemWrapper {...otherProps}>
        {children}
    </ItemWrapper>
}
