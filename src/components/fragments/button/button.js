import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './button.scss';

class Button extends Component {
    constructor(props) {
        super(props);
        this._types = Button.types;
    }

    static get types() {
        return {
            block: 'type:block',
            submit: 'type:submit',
        };
    }

    render() {
        const { text, type, onAction } = this.props;

        let node;
        switch(type) {
        case this._types.submit :
            node = <input className="button" type="submit" value={text} onClick={onAction}/>;
            break;
        case this._types.block:
        default:
            node = (
                <div className="button" onClick={onAction}>
                    {text}
                </div>
            );
            break;
        }

        return node;
    }
}

export default withRouter(Button);
