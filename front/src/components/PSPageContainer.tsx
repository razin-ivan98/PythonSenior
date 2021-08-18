import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
    margin: 2em auto;
    width: min-content;
`


export const PSPageCantainer: React.FC = ({children}) => {
    return <Wrapper>
        {children}
    </Wrapper>
}