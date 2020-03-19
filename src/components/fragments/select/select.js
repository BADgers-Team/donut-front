import React, { Component } from 'react';

import './select.scss';

class Select extends Component {
    constructor(props) {
        super(props);

        this._events = Select.events;
        this._select = React.createRef();
    }
    
    static get events() {
        return {
            click: 'click',
            change: 'change',
            input: 'input',
        };
    }

    render() {
        const { label, className, values } = this.props;
        const classes = className ? `select ${className}` : 'select';
        const labelNode = label === null ? '' : <label className="select-label">{label}</label>;

        const selectItems = [];
        for (let [key, value] of Object.entries(values)) {
            selectItems.push(
                <option key={key} value={key}>
                    {value}
                </option>
            );
        }

        let node = (
            <>
                {labelNode}
                <select ref={this._select} className={classes}>
                    {selectItems}
                </select>
            </>
        );
        return node;
    }

    componentDidMount() {
        const { actionType, onAction } = this.props;
        if (actionType && onAction) {
           this._select.current.addEventListener(actionType, onAction); 
        }
        
    }
}

export default Select;
