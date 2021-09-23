import * as React from "react"
import styled from "styled-components"
import { Size } from "../consts"

const flexJustify: Record<JustifyTypes, string> = {
    start: "flex-start",
    end: "flex-end",
    between: "space-between",
    around: "space-around",
    center: "center"
}

const Wrapper = styled.div<Props>`
    justify-content: ${({justify}) => flexJustify[justify]};
    display: flex;
    flex-direction: ${({direction}) => direction};
    overflow: hidden;
    ${
        ({width, direction}) => {
            if (direction === "column" && width === "full") {
                return "height: 100%;"
            } else if (direction === "row" && width === "full") {
                return "width: 100%;"
            }
        }
    }
    & :last-child {
        margin: 0;
    }
    & > * {
        ${({direction}) => direction === "column" ? "margin-bottom: 1em" : "margin-right: 1em"};
    };
`

const ItemWrapper = styled.div<ItemProps>`
    flex-grow: ${({noGrow}) => noGrow ? 0 : 1};
    flex-shrink: ${({noShrink}) => noShrink ? 0 : 1};
`

type JustifyTypes = "start" | "end" | "between" | "around" | "center"

interface Props {
    direction?: "column" | "row",
    width?: "auto" | "full",
    justify?: JustifyTypes
    margin?: Size
}

export const CLFlex: React.FC<Props> = (props) => {
    const {
        children,
        direction = "row",
        width = "full",
        margin = "medium",
        justify = "between",
        ...otherProps
    } = props

    return <Wrapper
        direction={direction}
        width={width}
        margin={margin}
        justify={justify}
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
