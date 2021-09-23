import * as React from "react"

import styled from "styled-components"

const CLAlertWrapper = styled.div`
    background-color: #f8d7da;
    color: #841f29;
    height: 36px;
    font-size: 16px;
    border: 1px solid #841f29;
    border-radius: 5px;
    font-family: Arial;
    font-weight: bold;
    width: 100%;
    padding: 0.5em 1em;
    text-align: center;
`

interface Props {
}

export const CLAlert: React.FC<Props> = (props) => {

    return <CLAlertWrapper>
        {props.children}
    </CLAlertWrapper>
}
