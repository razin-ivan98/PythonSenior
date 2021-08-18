import { autobind } from "core-decorators"
import React, { ChangeEvent } from "react"
import { Size } from "../consts"
import { InputWrapper } from "./CLInput.styled"

interface Props {
    placeholder?: string
    value: string
    onChange: (value: string) => void
    width?: "full" | "auto" | number
    size?: Size
    type?: "text" | "password"
}

@autobind
export class CLInput extends React.Component<Props> {
    private changeHandle(e: ChangeEvent<HTMLInputElement>) {
        this.props.onChange(e.target.value)
    }

    render() {
        const {
            size = "medium",
            width = "auto",
            type = "text",
            placeholder,
            value,
        } = this.props

        return <InputWrapper
            inputSize={size}
            width={width}
            placeholder={placeholder}
            value={value}
            type={type}
            onChange={this.changeHandle}
        />
    }
}
