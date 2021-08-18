import * as React from "react"

import { ColorVariant, Size } from "../consts"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CLIconWrapper } from "./CLIcon.styled"

require("./utils")

export enum CLIconType {
    DELETE = "trash",
    EDIT = "pen",
    BAN = "ban",
    OK = "check",
    CAT = "cat"
}

interface Props {
    type?: CLIconType
    size: Size
    onClick?: () => void
    variant: ColorVariant
}

export const CLIcon: React.FC<Props> = (props) => {
    return <CLIconWrapper size={props.size} variant={props.variant}>
        <FontAwesomeIcon icon={props.type} />
    </CLIconWrapper>
}
