import Highlight, { defaultProps } from "prism-react-renderer"
import React, { Fragment, useState } from "react"
import Editor from "../../EditorLib/Editor"
import theme from "prism-react-renderer/themes/vsDark";
import { observer } from "mobx-react";
import { action, computed, observable } from "mobx";
import { autobind } from "core-decorators";
import { CLButton } from "../../CLib/CLButton/CLButton";
import {Wrapper, Line, LineNo, LineContent, Pre, ErrorWrapper, ConsoleWrapper, ConsoleErrorWrapper, ConsoleLabel } from "./PSCodeEditor.styled"
import {Error} from "./PSCodeEditor"

interface Props {
  output: string;
  error: Error;
  submitCode: () => void,
  showConsole?: boolean
  labelClick: () => void
}

@observer
@autobind
export class PSConsole extends React.Component<Props> {

    private highlight() {
        return (
        <Highlight {...defaultProps} theme={theme} code={this.props.output} language="bash">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <Pre className={className} style={style}>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
                {
                  this.props.error && <ConsoleErrorWrapper>
                    ERROR: {this.props.error.text}
                  </ConsoleErrorWrapper>
                }
              </Pre>
            )}
          </Highlight>
    )}

    render() {
        return <>
        {/* <ControlWrapper>
          
          <CLButton variant="success" onClick={this.props.submitCode}>Выполнить</CLButton>
        </ControlWrapper> */}
        
        <ConsoleWrapper show={this.props.showConsole}>
          <ConsoleLabel onClick={this.props.labelClick}>console</ConsoleLabel>
          {this.highlight()}
        </ConsoleWrapper>
        </>
    }
}
