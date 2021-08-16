import React, { Fragment, KeyboardEvent, KeyboardEventHandler, useState, useRef } from "react"
import { render } from "react-dom"
// import Editor from "@monaco-editor/react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import Editor from "./Editor"
// import Editor from "react-simple-code-editor"

export function mountApp() {
    render(<App />, document.getElementById("root"))
}

const exampleCode = `
def kek:
  lol()
`.trim();

import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

export const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow: scroll;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`;

export const Line = styled.div`
  display: table-row;
`;

export const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

export const LineContent = styled.span`
  display: table-cell;
`;

const trimSpacesLeft = (str: string) => {
    const splitted = str.split("")
    const newArr = []
    let endOfStringFlag = true
    for (let i = splitted.length - 1; i >= 0; i--) {
        if (splitted[i] !== " ") {
            endOfStringFlag = false
        }
        if (!endOfStringFlag) {
            newArr.push(splitted[i])
        }
    }
    return newArr.reverse().join('')
}

const App: React.FC<{}> = () => {

    const [code, changeCode] = useState(exampleCode)
    // const [prevCode, changePrevCode] = useState(exampleCode)

    // const addTabFlag = useRef(false)

    // const keyDownHandle: KeyboardEventHandler<HTMLDivElement> & ((e: KeyboardEvent<HTMLTextAreaElement>) => void) = (e) => {
    //     if (e.code === "Enter") {
    //         addTabFlag.current = true
    //     }
    // }

    const errorStrings = [0, 2]

    const changeHandle = (newCode: string) => {
        // if (addTabFlag.current) {
        //     newCode += "  "
        // }
    
        // changePrevCode(code)
        changeCode(newCode)
    
        // addTabFlag.current = false
    }

    const styles: {root: React.CSSProperties} = {
        root: {
          boxSizing: 'border-box',
          fontFamily: '"Dank Mono", "Fira Code", monospace',
          ...theme.plain,
          fontWeight: 100
        }
      }

    // const validateHandle = () => {
    //     console.log("VALIDATE");
        
    // }

    const pointerEnterHandle = () => {
        console.log("POINTER ENTER");
        
    }

    const  highlight = (code: string) => (
        <Highlight {...defaultProps} theme={theme} code={code} language="python">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Fragment>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })} style={errorStrings.includes(i) ? {backgroundColor: "red", opacity: "40%"} : {}}>
                  {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
                </div>
              ))}
            </Fragment>
          )}
        </Highlight>
    )

    return (
        <Editor
            insertSpaces
            tabSize={2}
            value={code}
            onValueChange={changeHandle}
            highlight={highlight}
            padding={10}
            style={styles.root}
            // onKeyDown={keyDownHandle}
            // onPointerEnter={pointerEnterHandle}
            // onPointerMove={pointerEnterHandle}
            // onPointerEnterCapture={pointerEnterHandle}
            // onSelect={pointerEnterHandle}
        />
    )
}
