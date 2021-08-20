import Highlight, { defaultProps } from "prism-react-renderer"
import React, { Fragment, useState } from "react"
import Editor from "../../EditorLib/Editor"
import theme from "prism-react-renderer/themes/okaidia";
import { observer } from "mobx-react";
import { action, computed, observable } from "mobx";
import { autobind } from "core-decorators";
import { CLButton } from "../../CLib/CLButton/CLButton";
import { ButtonWrapper, Wrapper, Line, LineNo, LineContent, Pre, ErrorWrapper, ConsoleWrapper } from "./PSCodeEditor.styled"

interface Props {
  output: string;
}

@observer
@autobind
export class PSConsole extends React.Component<Props> {

    private highlight() {
        return (
        <Highlight {...defaultProps} theme={theme} code={this.props.output} language="jsx">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <Pre className={className} style={style}>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </Pre>
            )}
          </Highlight>
    )}

    render() {
        return <ConsoleWrapper>
            {this.highlight()}
        </ConsoleWrapper>
    }
}
