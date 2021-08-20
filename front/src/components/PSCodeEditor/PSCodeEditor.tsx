import Highlight, { defaultProps } from "prism-react-renderer"
import React, { Fragment, useState } from "react"
import Editor from "../../EditorLib/Editor"
import theme from "prism-react-renderer/themes/nightOwl";
import { observer } from "mobx-react";
import { action, computed, observable } from "mobx";
import { autobind } from "core-decorators";
import { CLButton } from "../../CLib/CLButton/CLButton";
import { ButtonWrapper, Wrapper, Line, LineNo, LineContent, Pre, ErrorWrapper } from "./PSCodeEditor.styled"
import { PSConsole } from "./PSConsole";

interface Error {
    line: number
    text: string
}

@observer
@autobind
export class PSCodeEditor extends React.Component {

    @observable
    private code: string = `
def kek(lol):
    print(lol)

kek()
kek("LOL")
`
    private setCode(newCode: string) {
        this.setError(null)
        this.code = newCode
    }

    @observable.ref
    private error: Error = null
    @action
    private setError(error: Error) {
        this.error = error
    }

    @observable
    private output: string = ""
    @action
    private setOutput(output: string) {
        this.output = output
    }

    private styles: {root: React.CSSProperties} = {
        root: {
            boxSizing: 'border-box',
            fontFamily: '"Dank Mono", "Fira Code", monospace',
            ...theme.plain,
            fontWeight: 100,
            minHeight: "70vh",
            overflow: "visible"
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
            this.setOutput(json.output)
            if (json.status === "ERROR") {
                this.setError(json.error)
            } else {
                this.setError(null)
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
                <Pre>
                    {tokens.map((line, i) => (
                        <Line key={i} errored={Boolean(this.error) && this.error.line === i + 1}>
                            <LineNo>{i + 1}</LineNo>
                            <LineContent>
                                {line.map((token, key) => <span key={key} {...getTokenProps({ token, key })} />)}
                            </LineContent>
                            {this.error && this.error.line === i + 1 &&
                                <ErrorWrapper>
                                    {this.error.text}
                                </ErrorWrapper>
                                }
                        </Line>
                    ))}
                </Pre>
            )}
        </Highlight>
    )}

    render() {
        return <>
            <Wrapper>
                <Editor
                    insertSpaces
                    tabSize={2}
                    value={this.code}
                    onValueChange={this.setCode}
                    highlight={this.highlight}
                    padding={10}
                    style={this.styles.root}
                    //костыль чтоб обновлялось норм
                    error={this.error}
                    // isErrorSwown={this.isErrorShown}
                />
                <ButtonWrapper>
                    <CLButton variant="success" onClick={this.submitCode}>Выполнить</CLButton>
                </ButtonWrapper>
            </Wrapper>
            <PSConsole output={this.output} />
            
        </>
    }
}
