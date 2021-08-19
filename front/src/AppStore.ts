import { action, computed, observable } from "mobx";
import { refStructEnhancer } from "mobx/dist/internal";
import { User } from "./types";


export class AppStore {
    constructor() {
        void this.getMe()
    }

    @observable
    private $me: User = null
    
    @action
    public setMe(me: User) {
        this.$me = me
    }

    public async getMe() {
        const response = await fetch("http://0.0.0.0:5000/", {
            method: "GET",
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

    public async signIn(login: string, passwd: string) {
        const response = await fetch("http://0.0.0.0:5000/api/sign_in", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({login, passwd})
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

    public async signUp(login: string, passwd: string, repeatPasswd: string) {
        const response = await fetch("http://0.0.0.0:5000/api/sign_up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({login, passwd, repeatPasswd})
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
