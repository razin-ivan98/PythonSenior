import { autobind } from "core-decorators"
import { action, observable } from "mobx"
import { observer } from "mobx-react"
import React from "react"
import { CLButton } from "../CLib/CLButton/CLButton"
import { CLCard, CLCardHeader } from "../CLib/CLCard/CLCard"
import { CLFlex, CLFlexItem } from "../CLib/CLFlex/CLFlex"
import { PSPageCantainer } from "./PSPageContainer"
import { PSLogo } from "./PSLogo"
import { User } from "../types"

@autobind
@observer
export class PSAdminPanel extends React.Component<{}, {}> {

    componentDidMount() {
        this.fetchUsers()
    }

    @observable.ref
    private users: User[] = null

    @action
    private setUsers(users: User[]) {
        this.users = users
    }
    
    private async fetchUsers() {
        const response = await fetch("/api/admin/get_users", {
            method: "GET",
        })
        if (response.ok) {
            const json = await response.json();
    
            this.setUsers(json)
        } else {
        }
    }

    private async handleClick(userToChange: User) {
        let endpoint = "/api/admin/"
        if (userToChange.approved) {
            endpoint += "ban_user?name="
        } else {
            endpoint += "approve_user?name="
        }

        const response = await fetch(endpoint + userToChange.name, {
            method: "GET",
        })
        if (response.ok) {
            this.setUsers(this.users.map((user) => ({
                ...user,
                approved: user.id === userToChange.id ? !userToChange.approved : user.approved
            })))
        } else {
        }
    }

    render() {
        return <PSPageCantainer>
            <PSLogo />
            <CLCard width={400}>
                <CLCardHeader>Админка</CLCardHeader>
                <CLFlex direction="column">
                    {
                        this.users?.map((user) => (
                            <CLFlex key={"user" + user.name}>
                                <CLFlexItem>{user.name}</CLFlexItem>
                                <CLFlexItem>{user.verificationCode}</CLFlexItem>
                                <CLButton
                                    variant={user.approved ? "danger" : "success"}
                                    onClick={this.handleClick.bind(this, user)}
                                >
                                    {user.approved ? "Заблокировать" : "Одобрить"}
                                </CLButton>
                            </CLFlex>
                        ))
                    }
                </CLFlex>
            </CLCard>
        </PSPageCantainer>
    }
}
