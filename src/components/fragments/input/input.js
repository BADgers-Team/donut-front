import React, { Component } from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { classNames } from 'utils/class-names';

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
            number: 'number',
            checkbox: 'checkbox',
            radio: 'radio',
        };
    }

    static get events() {
        return {
            click: 'click',
        };
    }

    handleChangeValue = (event) => {
        const value = event.target.value;
        this.setState({ field: value });
    };

    render() {
        const { name, type, placeholder, label, id, onAction, text, min, max, classValue, material, value, fileTypes, custom, defaultValue, error, isRequired, checked } = this.props;
        const classes = classNames([
            'input',
            custom,
            Boolean(error) && 'input-error'
        ]);
      
        const action = onAction ? onAction : this.handleChangeValue;

        let node;
        switch(type) {
        case this._types.text:
            node = (
                <>
                    {!label ? '' : <label className="input-label">
                        {label}
                        {isRequired && <span style={{color: 'red'}}> *</span>}
                    </label>}
                    <input ref={this._input} className={classes} type="text" placeholder={placeholder} name={name} defaultValue={defaultValue} value={value} spellCheck="true" onChange={action}/>
                    {error && <span className="form-input__error">{error}</span>}
                </>
            );
            break;
        case this._types.file:
            node = (
                <>
                    {!label ? '' : <label className="file-label">{label}</label>}
                    <label htmlFor={id}>
                        <div className="file-button" type="button">
                            <div className="file-text">{text}</div>
                        </div>
                    </label>
                    <label id="loader"></label>
                    {error && <span className="form-input__error">{error}</span>}
                    <input ref={this._input} type="file" className='file-input' accept={fileTypes} name={name} id={id} onChange={onAction}/>
                </>
            );
            break;
        case this._types.textarea:
            node = (
                <>
                    {!label ? '' : <label className="textarea-label">
                        {label}
                        {isRequired && <span style={{color: 'red'}}> *</span>}
                    </label>}
                    <textarea className={classes} ref={this._input} placeholder={placeholder} name={name} spellCheck="true"/>
                    {error && <span className="form-input__error">{error}</span>}
                </>
            );
            break;
        case this._types.number:
            node = (
                <>
                    <input ref={this._input} type="number" min={min} max={max} name={name} defaultValue={defaultValue} value={value} className={classes}/>
                    {!label ? '' : <label className="number-label">{label}</label>}
                </>
            );
            break;       
        case this._types.checkbox:
            if (material) { 
                node = (
                    <>
                        <FormControlLabel
                        control={<Checkbox 
                            style={{color:'white'}}
                            size='medium'
                            name={name} 
                            onChange={onAction}
                            className={classValue}
                            id={`${id}`}
                            checked = {checked}
                        />}
                        label={label}
                        labelPlacement="end"
                        />
                    </>
                );
            } else {
                node = (
                    <>
                        <input ref={this._input} type="checkbox" className={classValue} name={name} id={id} onChange={onAction}/>
                        {label === null || label === undefined? '' : <label  htmlFor={name}>{label}</label>}
                    </>
                );
            }
            break; 
        case this._types.radio:
            if (material) { 
                node = (
                    <>
                        <FormControlLabel
                        control={<Radio 
                            style={{color:'white'}}
                            size='medium'
                            name={name} 
                            onChange={onAction}
                            className={classValue}
                            id={`${id}`}
                            value={value}
                            checked = {checked}
                        />}
                        label={label}
                        labelPlacement="end"
                        />
                    </>
                );
            } else {
                node = (
                    <>
                        <input ref={this._input} type="radio" name={name} defaultValue={defaultValue} value={value} className={classes}/>
                        {!label ? '' : <label className="radio-label">{label}</label>}
                    </>
                );
            }
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

    static startLoader() {
        if (!document.getElementById('loader')) return;
        document.getElementById('loader').innerText = 'Файл загружается...';
        return true;
    }

    static finishLoader(isSuccess) {
        if (!document.getElementById('loader')) return;
        if (isSuccess) {
            document.getElementById('loader').innerText = 'Файл загружен';
        } else {
            document.getElementById('loader').innerText = '';
        }
    }

    componentDidMount() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.innerText = '';
        }

        const { actionType, onAction } = this.props;
        if (!(actionType in this._events)) return;
        if (actionType && onAction) {
            this._input.current.addEventListener(actionType, onAction); 
        }
        
    }
}

export default Input;
