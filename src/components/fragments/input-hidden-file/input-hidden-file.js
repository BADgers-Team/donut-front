import React, { Component } from 'react';

import './input-hidden-file.scss';

class InputHiddenFile extends Component {
    render() {
        const { children, id, accept, onChange } = this.props;

        return (
            <div className="input-hidden-file">
                <input
                    className="input-hidden-file__input"
                    type="file"
                    name={id}
                    id={id}
                    accept={accept}
                    onChange={onChange}
                />
                <label className="input-hidden-file__label" htmlFor={id}>
                    {children}
                </label>
            </div>
        );
    }
}

export { InputHiddenFile };
