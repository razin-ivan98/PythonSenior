import styled from 'styled-components'
import { Colors, ColorVariant, Size } from '../consts'

interface Props {
    size: Size,
    variant: ColorVariant
}

const iconSizes: Record<Size, {width: string, fontSize: string}> = {
    "large": {width: "24px", fontSize: "24px"},
    "medium": {width: "16px", fontSize: "16px"},
    "small": {width: "12px", fontSize: "12px"}
}

export const CLIconWrapper = styled.div<Props>`
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${({size}) => iconSizes[size].fontSize};
    color: ${({variant}) => Colors[variant].inner};
    width: ${({size}) => iconSizes[size].width};
    height: ${({size}) => iconSizes[size].width};
`
