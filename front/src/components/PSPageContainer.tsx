import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
    margin: 2em auto;
    max-width: 500px;
`


export const PSPageCantainer: React.FC = ({children}) => {
    return <Wrapper>
        {children}
    </Wrapper>
}