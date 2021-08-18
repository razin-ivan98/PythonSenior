import * as React from "react"
import { CLText } from "../CLText/CLText"
import { Wrapper, HeaderWrapper } from "./CLCard.styled"

interface Props {
    width?: "full" | "auto" | number
}

export const CLCard: React.FC<Props> = (props) => {
    return <Wrapper width={props.width}>
        {props.children}
    </Wrapper>
}

export const CLCardHeader: React.FC<Props> = (props) => {
    return <HeaderWrapper>
        <CLText size="large">
            {props.children}
        </CLText>
    </HeaderWrapper>
}