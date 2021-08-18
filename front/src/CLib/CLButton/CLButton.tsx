import * as React from "react"
import { CLFlex, CLFlexItem } from "../CLFlex/CLFlex"
import { CLIcon, CLIconType } from "../CLIcon/CLIcon"

import {ColorVariant, Size} from "../consts"
import { Wrapper } from "./CLButton.styled"

interface Props {
    size?: Size
    variant?: ColorVariant
    onClick?: () => void
    iconLeft?: CLIconType
    iconRight?: CLIconType
    children?: any,
    width?: "full" | "auto" | number
}

export const CLButton: React.FC<Props> = (props) => {
    const {
        variant = "primary",
        size = "medium",
        width,
        onClick,
        children,
        iconLeft,
        iconRight
    } = props

    return <Wrapper 
        variant={variant}
        size={size}
        width={width}
        onClick={onClick}
    >
        <CLFlex>
            {iconLeft && <CLFlexItem noGrow noShrink>
                <CLIcon type={iconLeft} variant={variant} size={size} />
            </CLFlexItem>}
            <CLFlexItem>
                {children}
            </CLFlexItem>
            {iconRight && <CLFlexItem noGrow noShrink>
                <CLIcon type={iconRight} variant={variant} size={size} />
            </CLFlexItem>}
        </CLFlex>
    </Wrapper>
}
