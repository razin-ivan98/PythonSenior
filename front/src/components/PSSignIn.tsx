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
import { AppStore } from "../AppStore"
import { PSLogo } from "./PSLogo"
import { CLAlert } from "../CLib/CLAlert/CLAlert"

interface Props {
    store: AppStore
}

@autobind
@observer
export class PSSignIn extends React.Component<Props, {}> {
    @observable
    private error: string = null
    @action
    private setError(value: string) {
        this.error = value
    }

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

    private async submit() {
        this.setError(null)
        const res = await this.props.store.signIn(this.login, this.passwd)

        if (res) {            
            this.setError(res.errors[0])
        }
    }

    render() {
        return <PSPageCantainer>
            <PSLogo />
            <CLCard>
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
                    {this.error && <CLAlert>{this.error}</CLAlert>}
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