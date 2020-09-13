import React from 'react';

import './toast.scss';

export const TOAST_TYPES = {
    DEFAULT: 'default',
    SUCCESS: 'success',
    ERROR: 'error',
};

export default class Toast extends React.Component {
    onCloseClick = () => {
        const {id, onClose} = this.props;

        console.log('onCloseClick fired', onClose);

        if (onClose) {
            onClose(id);
        }
    }

    get icon() {
        const {type} = this.props;

        if (type === TOAST_TYPES.ERROR) {
            return 'fas fa-exclamation-triangle';
        } else if (type === TOAST_TYPES.SUCCESS) {
            return 'fas fa-check';
        }
        return null;
    }

    render() {
        const {icon} = this;
        const {text} = this.props;

        return (
            <div className="toast">
                {icon && (
                    <div className="toast__icon">
                        <i className={icon}/>
                    </div>
                )}
                <div className="toast__text">
                    {text}
                </div>
                <div className="toast__close" onClick={this.onCloseClick}>
                    <i className="fa fa-times"/>
                </div>
            </div>
        );
    }
}
