import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

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
            link: 'type:link',
        };
    }

    render() {
        const { text, type, onAction, to, className } = this.props;
        const classes = className ? `button ${className}` : 'button';

        let node;
        switch(type) {
        case this._types.submit :
            node = <input className={classes} type="submit" value={text} onClick={onAction}/>;
            break;
        case this._types.link:
            node = <Link className={classes} to={to} onClick={onAction}>{text}</Link>;
            break;
        case this._types.block:
        default:
            node = (
                <div className={classes} onClick={onAction}>
                    {text}
                </div>
            );
            break;
        }

        return node;
    }
}

export default withRouter(Button);