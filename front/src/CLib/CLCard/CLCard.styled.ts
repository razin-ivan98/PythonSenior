import styled from "styled-components"

interface Props {
    width: "auto" | "full" | number
}

export const Wrapper = styled.div<Props>`
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    width: ${({width}) => {
        if (width === "auto") {
            return "min-content"
        } else if (!width || width === "full") {
            return "unset"
        } else {
            return width + "px"
        }
    }};
`

export const HeaderWrapper = styled.div`
    text-align: center;
    margin-bottom: 20px;
`
