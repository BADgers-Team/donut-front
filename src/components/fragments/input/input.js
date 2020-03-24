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
            textarea: 'textarea',
        };
    }

    static get events() {
        return {
            click: 'click',
        };
    }

    render() {
        const { name, type, placeholder, label, id, onAction } = this.props;

        let node;
        switch(type) {
        case this._types.text:
            node = (
                <>
                    {label === null ? '' : <label className="input-label">{label}</label>}
                    <input ref={this._input} type="text" placeholder={placeholder} name={name} spellCheck="true"/>
                </>
            );
            break;
        case this._types.file:
            node = (
                <>
                    {label === null ? '' : <label className="file-label">{label}</label>}
                    <label htmlFor={id}>
                        <div className="file-button" type="button">
                            <div className="file-text">Прикрепить файл</div>
                        </div>
                    </label>
                    <input ref={this._input} type="file" className='file-input' name={name} id={id} onChange={onAction}/>
                </>
            );
            break;
        case this._types.textarea:
            node = (
                <>
                    {label === null ? '' : <label className="file-label">{label}</label>}
                    <textarea ref={this._input} placeholder={placeholder} name={name} spellCheck="true"/>
                </>
            );
            break;
        default:
            node = (
                <>
                    <input ref={this._input} type="text" spellCheck="true"/>
                </>
            );
            break;
        }

        return node;
    }

    componentDidMount() {
        const { actionType, onAction } = this.props;
        if (!(actionType in this._events)) return;
        if (actionType && onAction) {
            this._input.current.addEventListener(actionType, onAction); 
        }
        
    }
}

export default Input;