import React, { Component } from 'react';

import {Select as SelectMaterial} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';

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
        const { label, values, name, material, id, classValue } = this.props;
         
        const selectItems = values.map((item) => {
            return (
                <option id={item.id} key={item.value} value={item.value}>
                    {item.text}
                </option>
            );
        });

        let node;
        if (material) {
            node = (
                <>
                    {(!label) ? '' : <InputLabel id={`${id}-label`} className="select-label">{label}</InputLabel>}
                    <SelectMaterial
                        variant='outlined'
                        native
                        labelId={`${id}-label`}
                        id={id}
                        className={classValue}
                    >
                        {selectItems}
                    </SelectMaterial>
                </>
            );
        } else {
            node = (
                <>
                    {(!label) ? '' : <label className="select-label">{label}</label>}
                    <select ref={this._select} name={name} className={classValue}>
                        {selectItems}
                    </select>
                </>
            );       
        }
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
