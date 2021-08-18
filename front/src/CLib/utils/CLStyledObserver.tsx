import { observer } from "mobx-react";
import React from "react"
import { StyledComponent } from "styled-components";

type Props = {
    component: any
} & {[key: string]: any}

@observer
export class CLStyledObserver extends React.Component<Props, {}> {
    render() {
        console.log(this.props.component);
        
        const {
            component,
            ...props
        } = this.props
        return <React.Fragment>
            {component}
        </React.Fragment>
    }
}