import React, { Component } from 'react';

import './file-input.scss';

class FileInput extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        const { name, id, label, onAction, className } = this.props;
        const classes = className ? `file ${className}` : 'file';
        const labelNode = label === null ? '' : <label className="file-label">{label}</label>;

        let node = (
            <>
                {labelNode}
                <label htmlFor={id}>
                    <div className="file-button" type="button">
                        <div className="file-text">Прикрепить файл</div>
                    </div>
                </label>
                <input type="file" className={classes} name={name} id={id} onChange={onAction}/>
            </>
        );
        return node;
    }
}

export default FileInput;