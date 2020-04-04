import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BlockDialog } from 'components/blocks/block-modal/block-dialog/block-dialog';

export class BlockModal extends Component {
    constructor(props) {
        super(props);
        this.root = React.createRef();
        this.parent = props.parent || document.body;
        this.state = {
            open: props.open || false
        };
    }

    render() {
        const { children, ...rest } = this.props;

        if (this.parent) {
            return ReactDOM.createPortal((
                <BlockDialog {...rest} parentRef={this.root}>{children}</BlockDialog>
            ), this.parent);
        }
        return null;
    }
}
