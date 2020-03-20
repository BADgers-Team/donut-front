import React, { Component } from 'react';

import './file-input.scss';

class FileInput extends Component {
    constructor(props) {
        super(props);
        
        this._events = FileInput.events;
        this._file = React.createRef();
    }

    static get events() {
        return {
            click: 'click',
            change: 'change',
            input: 'input',
        };
    }

    render() {
        const { name, label, className } = this.props;
        const classes = className ? `file ${className}` : 'file';
        const labelNode = label === null ? '' : <label className="file-label">{label}</label>;

        let node = (
            <>
                {labelNode}
                <label htmlFor={name}>
                    <div className="file-button" type="button">
                        <div className="file-text">Прикрепить файл</div>
                    </div>
                </label>
                <input ref={this._file} type="file" className={classes} name={name}/>
            </>
        );
        return node;
    }

    componentDidMount() {
        const { actionType, onAction } = this.props;
        if (actionType && onAction) {
           this._file.current.addEventListener(actionType, onAction); 
        }
        
    }
}

export default FileInput;