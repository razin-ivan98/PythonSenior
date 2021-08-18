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

interface Props {
    store: AppStore
}

@autobind
@observer
export class PSSignUp extends React.Component<Props, {}> {

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

    @observable
    private repeatPasswd: string
    @action
    private setRepeatPasswd(repeatPasswd: string) {
        this.repeatPasswd = repeatPasswd
    }

    private signUp() {
        console.log("SIGN UP");
        
        void this.props.store.signUp(this.login, this.passwd, this.repeatPasswd)
    }

    render() {
        return <PSPageCantainer>
            <CLCard width={400}>
                <CLCardHeader>Регистрация</CLCardHeader>
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
                    <CLInput
                        type="password"
                        size="medium"
                        onChange={this.setRepeatPasswd}
                        placeholder="Repeat password"
                        value={this.repeatPasswd}
                    />
                    <CLButton variant="success" size="medium" onClick={this.signUp}>Register</CLButton>
                    <Link to="/sign_in">
                        <CLButton width="full" variant="primary" size="medium">
                            Sign In
                        </CLButton>
                    </Link>
                </CLFlex>
            </CLCard>
        </PSPageCantainer>
    }
}