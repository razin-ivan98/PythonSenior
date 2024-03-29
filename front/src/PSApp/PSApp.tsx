import { observer } from "mobx-react"
import React from "react"
import { render } from "react-dom"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom"
import { AppStore } from "../AppStore"
import { PSCodeEditor } from "../components/PSCodeEditor/PSCodeEditor"
import { PSNotApproved } from "../components/PSNotApproved"

import { PSSignIn } from "../components/PSSignIn"
import { PSSignUp } from "../components/PSSignUp"

import { PSAdminPanel } from "../components/PSAdminPanel"
import { AppWrapper } from "./PSApp.styled"

export function mountApp() {
    render(<PSApp />, document.getElementById("root"))
}

@observer
class PSApp extends React.Component<{}, {}> {
    private appStore = new AppStore

    componentDidMount() {
        this.appStore.getMe()
    }
 
    render() {
        if (this.appStore.me === undefined)
            return null
        
        return <AppWrapper>
            <Router>
                <Switch>
                    <Route path="/sign_in">
                        {this.appStore.me ? <Redirect to="/"/> : <PSSignIn store={this.appStore} />}
                    </Route>
                    <Route path="/sign_up">
                        {this.appStore.me ? <Redirect to="/"/> : <PSSignUp store={this.appStore} />}
                    </Route>
                    <Route path="/admin">
                        {this.appStore.me ? <PSAdminPanel /> : <Redirect to="./sign_in"/>}
                    </Route>
                    <Route path="/not_approved">
                        {this.appStore.me?.approved ? <Redirect to="./sign_in"/> : <PSNotApproved store={this.appStore} />}
                    </Route>
                    <Route path="/">
                        {this.appStore.me ? this.appStore.me.approved ? <PSCodeEditor store={this.appStore} /> : <Redirect to="./not_approved"/> : <Redirect to="./sign_in"/>}
                    </Route>

                </Switch>
            </Router>
        </AppWrapper>
    }
}
