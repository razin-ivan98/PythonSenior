import Highlight, { defaultProps } from "prism-react-renderer"
import React, { Fragment, useState } from "react"
import Editor from "../../EditorLib/Editor"
import theme from "prism-react-renderer/themes/nightOwl";
import { observer } from "mobx-react";
import { action, computed, observable } from "mobx";
import { autobind } from "core-decorators";
import { CLButton } from "../../CLib/CLButton/CLButton";
import { ButtonWrapper } from "./PSCodeEditor.styled"


const exampleCode = `
def kek:
  lol()
`.trim();

@observer
@autobind
export class PSCodeEditor extends React.Component {
    @observable
    private code: string = ""
    @action
    private setCode(newCode: string) {
        this.code = newCode
    }

    @observable.ref
    private errorStrings: number[] = []
    @action
    private setErrorStrings(errorStrings: number[]) {
        this.errorStrings = errorStrings
    }

    private styles: {root: React.CSSProperties} = {
        root: {
            boxSizing: 'border-box',
            fontFamily: '"Dank Mono", "Fira Code", monospace',
            ...theme.plain,
            fontWeight: 100,
            height: "100vh",
            overflow: "auto",
            width: "100vw"
        }
    }

    private async submitCode() {
        const response = await fetch("/api/code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({code: this.code})
        })
        if (response.ok) {
            const json = await response.json();
            if (json.status === "ERROR") {
                this.setErrorStrings([json.error.line])
            } else {
                this.setErrorStrings([])
            }
            console.log(json);
        } else {
            const json = await response.json();
            console.error(json);
        }
    }

    private highlight() {
        return (
        <Highlight {...defaultProps} theme={theme} code={this.code} language="python">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Fragment>
              {tokens.map((line, i) => (
                <div
                    {...getLineProps({ line, key: i })}
                    style={this.errorStrings.includes(i + 1) ? {backgroundColor: "red", opacity: "40%"} : {}}
                >
                    {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                </div>
              ))}
            </Fragment>
          )}
        </Highlight>
    )}

    render() {
        return <>
            <Editor
                insertSpaces
                tabSize={2}
                value={this.code}
                onValueChange={this.setCode}
                highlight={this.highlight}
                padding={10}
                style={this.styles.root}
                //костыль чтоб обновлялось норм
                errorStrings={this.errorStrings}
            />
            <ButtonWrapper>
                <CLButton variant="success" onClick={this.submitCode}>Выполнить</CLButton>
            </ButtonWrapper>
        </>
    }
}
