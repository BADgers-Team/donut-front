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
        };
    }

    render() {
        const { label, values, name } = this.props;

         
        let selectItems = values.map((item) => {
            return (
                <option id={item.id} key={item.value} value={item.value}>
                    {item.text}
                </option>
            );
        });

        const node = (
            <>
                {label === null ? '' : <label className="select-label">{label}</label>}
                <select ref={this._select} name={name}>
                    {selectItems}
                </select>
            </>
        );
        return node;
    }

    componentDidMount() {
        const { actionType, onAction } = this.props;
        if (!(actionType in this._events)) return;
        if (actionType && onAction) {
            this._select.current.addEventListener(actionType, onAction); 
        }
    }
}

export default Select;
