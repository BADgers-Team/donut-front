import React, { Component } from 'react';

import './textarea.scss';

class Textarea extends Component {
    constructor(props) {
        super(props);

        this._events = Textarea.events;
        this._input = React.createRef();
    }

    static get events() {
        return {
            click: 'click',
            change: 'change',
            input: 'input',
        };
    }

    render() {
        const { name, placeholder, label, className } = this.props;
        const classes = className ? `textarea ${className}` : 'textarea';
        const labelNode = label === null ? '' : <label className="textarea-label">{label}</label>;

        let node = (
            <>
                {labelNode}
                <textarea ref={this._input} className={classes} placeholder={placeholder} name={name} spellCheck="true"/>
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

export default Textarea;