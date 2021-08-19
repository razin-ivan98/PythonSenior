import { autobind } from "core-decorators"
import { action, observable } from "mobx"
import { observer } from "mobx-react"
import React from "react"
import { CLButton } from "../CLib/CLButton/CLButton"
import { CLCard, CLCardHeader } from "../CLib/CLCard/CLCard"
import { CLFlex } from "../CLib/CLFlex/CLFlex"
import { CLInput } from "../CLib/CLInput/CLInput"
import { PSPageCantainer } from "./PSPageContainer"
import { Link } from "react-router-dom"
import { CLText } from "../CLib/CLText/CLText"
import { AppStore } from "../AppStore"
import { PSLogo } from "./PSLogo"

interface Props {
    store: AppStore
}

@autobind
@observer
export class PSSignIn extends React.Component<Props, {}> {
    @observable
    private login: string
    @action
    private setLogin(login: string) {
        this.login = login
    }

    @observable
    private passwd: string
    @action
    private setPasswd(passwd: string) {
        this.passwd = passwd
    }

    private submit() {
        void this.props.store.signIn(this.login, this.passwd)
    }

    render() {
        return <PSPageCantainer>
            <PSLogo />
            <CLCard width={400}>
                <CLCardHeader>Авторизуйтесь в системе</CLCardHeader>
                <CLFlex direction="column">
                    <CLInput
                        size="medium"
                        onChange={this.setLogin}
                        placeholder="Login"
                        value={this.login}
                    />
                    <CLInput
                        type="password"
                        size="medium"
                        onChange={this.setPasswd}
                        placeholder="Password"
                        value={this.passwd}
                    />
                    <CLButton variant="success" size="medium" onClick={this.submit}>
                        Sign In
                    </CLButton>
                    <Link to="/sign_up">
                        <CLButton width="full" variant="primary" size="medium">
                            Register
                        </CLButton>
                    </Link>
                </CLFlex>
            </CLCard>
        </PSPageCantainer>
    }
}