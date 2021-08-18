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
import { PSSignIn } from "../components/PSSignIn"
import { PSSignUp } from "../components/PSSignUp"

export function mountApp() {
    render(<PSApp />, document.getElementById("root"))
}

@observer
class PSApp extends React.Component<{}, {}> {
    private appStore = new AppStore
 
    render() {
        return <Router>
            <Switch>
                <Route path="/sign_in">
                    {this.appStore.me ? <Redirect to="./"/> : <PSSignIn store={this.appStore} />}
                </Route>
                <Route path="/sign_up">
                    {this.appStore.me ? <Redirect to="./"/> : <PSSignUp store={this.appStore} />}
                </Route>
                <Route path="/">
                    {this.appStore.me ? "Index" : <Redirect to="./sign_in"/>}
                </Route>
                <Route path="/not_approved">
                    Index
                </Route>
            </Switch>
        </Router>
    }
    
    
    
    // <CLCodeEditor />
}
