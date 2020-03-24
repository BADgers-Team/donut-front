import React, { Component } from 'react';

import './input.scss';

class Input extends Component {
    constructor(props) {
        super(props);
        
        this._types = Input.types;
        this._events = Input.events;
        this._input = React.createRef();
    }

    static get types() {
        return {
            text: 'text',
            file: 'file',
        };
    }

    static get events() {
        return {
            click: 'click',
            change: 'change',
            input: 'input',
        };
    }

    render() {
        const { name, type, placeholder, label } = this.props;
        //const classes = className ? `input ${className}` : 'input';
        const labelNode = label === null ? '' : <label className="input-label">{label}</label>;

        let node = (
            <>
                {labelNode}
                <input ref={this._input} type={type} placeholder={placeholder} name={name} spellCheck="true"/>
            </>
        );
        return node;
    }

    componentDidMount() {
        const { actionType, onAction } = this.props;
        if (actionType && onAction) {
           this._input.current.addEventListener(actionType, onAction); 
        }
        
    }
}

export default Input;