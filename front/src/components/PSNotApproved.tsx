import React from "react"
import { CLButton } from "../CLib/CLButton/CLButton"
import { CLCard, CLCardHeader } from "../CLib/CLCard/CLCard"
import { PSPageCantainer } from "./PSPageContainer"
import { PSLogo } from "./PSLogo"
import { CLText } from "../CLib/CLText/CLText"
import { CLFlex } from "../CLib/CLFlex/CLFlex"
import { Link } from "react-router-dom"
import { AppStore } from "../AppStore"

interface Props {
    store: AppStore
}

export class PSNotApproved extends React.Component<Props, {}> {
    render() {
        return <PSPageCantainer>
            <PSLogo />
            <CLCard width={400}>
                <CLCardHeader>Ваше участие не одобрено администрацией</CLCardHeader>
                <CLFlex direction="column">
                    <CLText>Дождитесь пока администрация сервиса одобрит Ваше участие. При необхоимости можете написать администрации в личку))))</CLText>
                    <CLFlex justify="center"><CLButton onClick={this.props.store.getMe}>Уже одобрили</CLButton></CLFlex>
                </CLFlex>
            </CLCard>
        </PSPageCantainer>
    }
}
