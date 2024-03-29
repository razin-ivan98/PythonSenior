import Highlight, { defaultProps } from "prism-react-renderer"
import React, { Fragment, useState } from "react"
import Editor from "../../EditorLib/Editor"
import theme from "prism-react-renderer/themes/nightOwl";
import { observer } from "mobx-react";
import { action, computed, observable } from "mobx";
import { autobind } from "core-decorators";
import { CLButton } from "../../CLib/CLButton/CLButton";
import { Wrapper, Line, LineNo, LineContent, Pre, ErrorWrapper, MainContainer, ButtonWrapper } from "./PSCodeEditor.styled"
import { PSConsole } from "./PSConsole";
import { CLFlex } from "../../CLib/CLFlex/CLFlex";
import { AppStore } from "../../AppStore";

export interface Error {
    line: number
    text: string
}

interface Props {
    store: AppStore
}

@observer
@autobind
export class PSCodeEditor extends React.Component<Props> {

    @observable
    private showConsole: boolean = false
    @action
    private setShowConsole(value: boolean) {
        this.showConsole = value
    }
    private switchShowConsole() {
        this.setShowConsole(!this.showConsole)
    }

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
            minHeight: "70%",
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
            this.setShowConsole(true)
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
                        <Line
                            key={i}
                            errored={Boolean(this.error) && this.error.line === i + 1}
                            isEmpty={line.length === 1 && line[0].empty}
                        >
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
        return <MainContainer>
            <Wrapper showConsole={this.showConsole}>
                <ButtonWrapper>
                    <CLFlex width="full" direction="column" justify="between">
                        <CLFlex direction="column" margin="small" width="auto">
                            <CLButton iconLeft="play" variant="success" onClick={this.submitCode} />
                            <CLButton iconLeft="delete" variant="primary" onClick={() => {this.setError(null); this.setOutput("")}} />
                        </CLFlex>
                        <CLButton iconLeft="signOut" variant="danger" onClick={this.props.store.signOut} />
                    </CLFlex>
                </ButtonWrapper>
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
            </Wrapper>
            <PSConsole
                output={this.output}
                error={this.error}
                submitCode={this.submitCode}
                labelClick={this.switchShowConsole}
                showConsole={this.showConsole}
            />
            
        </MainContainer>
    }
}
