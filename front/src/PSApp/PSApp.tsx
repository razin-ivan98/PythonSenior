import { observable } from "mobx"
import { observer } from "mobx-react"
import React, { } from "react"
import { render } from "react-dom"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom"
import { AppStore } from "../AppStore"
import { PSCodeEditor } from "../components/PSCodeEditor/PSCodeEditor"
import { PSConsole } from "../components/PSCodeEditor/PSConsole"

import { PSSignIn } from "../components/PSSignIn"
import { PSSignUp } from "../components/PSSignUp"

import { PSAdminPanel } from "../components/PSAdminPanel"
import { CLButton } from "../CLib/CLButton/CLButton"


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
        
        return <React.Fragment>
            <CLButton onClick={this.appStore.signOut}>Выйти</CLButton>
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
                        {this.appStore.me?.approved ? <Redirect to="./sign_in"/> : "NOT APPROVED"}
                    </Route>
                    <Route path="/">
                        {this.appStore.me ? this.appStore.me.approved ? <PSCodeEditor /> : <Redirect to="./not_approved"/> : <Redirect to="./sign_in"/>}
                    </Route>

                </Switch>
            </Router>
        </React.Fragment>
    }
    
    
    
    // <CLCodeEditor />
}
