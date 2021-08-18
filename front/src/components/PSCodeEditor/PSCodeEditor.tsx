import Highlight, { defaultProps } from "prism-react-renderer"
import React, { Fragment, useState } from "react"
import Editor from "../../EditorLib/Editor"
import theme from "prism-react-renderer/themes/nightOwl";


const exampleCode = `
def kek:
  lol()
`.trim();


export const PSCodeEditor: React.FC<{}> = () => {
    const [code, changeCode] = useState(exampleCode)
    const errorStrings = [0, 2]

    const changeHandle = (newCode: string) => {
        changeCode(newCode)
    }

    const styles: {root: React.CSSProperties} = {
        root: {
            boxSizing: 'border-box',
            fontFamily: '"Dank Mono", "Fira Code", monospace',
            ...theme.plain,
            fontWeight: 100
        }
      }

    const  highlight = (code: string) => (
        <Highlight {...defaultProps} theme={theme} code={code} language="python">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Fragment>
              {tokens.map((line, i) => (
                <div
                    {...getLineProps({ line, key: i })}
                    style={errorStrings.includes(i) ? {backgroundColor: "red", opacity: "40%"} : {}}
                >
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
        />
    )
}
