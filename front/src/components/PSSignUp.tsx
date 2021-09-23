import { autobind } from "core-decorators"
import { action, observable } from "mobx"
import { observer } from "mobx-react"
import React from "react"
import { CLButton } from "../CLib/CLButton/CLButton"
import { CLCard, CLCardHeader } from "../CLib/CLCard/CLCard"
import { CLAlert } from "../CLib/CLAlert/CLAlert"
import { CLFlex } from "../CLib/CLFlex/CLFlex"
import { CLInput } from "../CLib/CLInput/CLInput"
import { PSPageCantainer } from "./PSPageContainer"
import { Link } from "react-router-dom"
import { AppStore } from "../AppStore"
import { PSLogo } from "./PSLogo"

interface Props {
    store: AppStore
}

@autobind
@observer
export class PSSignUp extends React.Component<Props, {}> {
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

    @observable
    private repeatPasswd: string
    @action
    private setRepeatPasswd(repeatPasswd: string) {
        this.repeatPasswd = repeatPasswd
    }

    @observable
    private verificationCode: string
    @action
    private setVerificationCode(code: string) {
        this.verificationCode = code
    }

    private async signUp() {
        this.setError(null)
        
        const res = await this.props.store.signUp(
            this.login,
            this.passwd,
            this.repeatPasswd,
            this.verificationCode
        )
        if (res) {
            this.setError(res.errors[0])
        }
    }

    render() {        
        return <PSPageCantainer>
            <PSLogo />
            <CLCard>
                <CLCardHeader>Регистрация</CLCardHeader>
                <CLFlex direction="column">
                    <CLInput
                        size="medium"
                        onChange={this.setLogin}
                        placeholder="Придумайте логин"
                        value={this.login}
                    />
                    <CLInput
                        type="password"
                        size="medium"
                        onChange={this.setPasswd}
                        placeholder="Придумайте пароль"
                        value={this.passwd}
                    />
                    <CLInput
                        type="password"
                        size="medium"
                        onChange={this.setRepeatPasswd}
                        placeholder="Повторите пароль"
                        value={this.repeatPasswd}
                    />
                    <CLInput
                        type="text"
                        size="medium"
                        onChange={this.setVerificationCode}
                        placeholder="Введите код подтверждения"
                        value={this.verificationCode}
                    />
                    {this.error && <CLAlert>{this.error}</CLAlert>}
                    <CLButton variant="success" size="medium" onClick={this.signUp}>Зарегистрироваться</CLButton>
                    <Link to="/sign_in">
                        <CLButton width="full" variant="primary" size="medium">
                            У меня уже есть аккаунт
                        </CLButton>
                    </Link>
                </CLFlex>
            </CLCard>
        </PSPageCantainer>
    }
}