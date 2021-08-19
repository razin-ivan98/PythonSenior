import React from "react"
import logo from "../assets/Senior.svg"
import styled from "styled-components"

const ImgWrapper = styled.img`
    width: 400px;
    margin: 0 auto 2em;
`


export const PSLogo: React.FC = () => {
    return  <ImgWrapper src={String(logo)} />
}
