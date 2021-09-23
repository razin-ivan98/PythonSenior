import { autobind } from "core-decorators";
import { action, computed, observable } from "mobx";
import { User } from "./types";

@autobind
export class AppStore {
    @observable.ref
    private $me: User
    
    @action
    public setMe(me: User) {
        this.$me = me
    }

    public async getMe() {
        const response = await fetch("/api/get_me", {
            method: "GET",
        })
        if (response.ok) {
            const json = await response.json();

            this.setMe(json)
            console.log(this.me);
            
        } else {
            const json = await response.json();
            this.setMe(null)
            alert("Ошибка HTTP: " + response.status);
        }
    }

    public async signIn(login: string, passwd: string) {
        const response = await fetch("/api/sign_in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({login, passwd})
        })
        if (response.ok) {
            const json = await response.json();
            this.setMe(json)
            console.log(this.me);

        } else {
            const json = await response.json();
            alert("Ошибка HTTP: " + response.status);
            console.log(json);
        }
    }

    public async signOut() {
        const response = await fetch("/api/sign_out", {
            method: "GET",
        })
        if (response.ok) {
            this.setMe(null)
        }
    }

    public async signUp(
        login: string,
        passwd: string,
        repeatPasswd: string,
        verificationCode: string
    ) {
        const response = await fetch("/api/sign_up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login,
                passwd,
                repeatPasswd,
                verificationCode
            })
        })
        if (response.ok) {
            const json = await response.json();
            this.setMe(json)
        } else {
            const json = await response.json();
            alert("Ошибка HTTP: " + response.status);
            console.log(json);
        }
    }

    @computed
    public get me() {
        return this.$me
    }
}
