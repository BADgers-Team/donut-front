import React, { Component } from 'react';

import './block-dialog.scss';
import CloseModalIcon from 'assets/img/close-modal.svg';

export class BlockDialog extends Component {
    constructor(props) {
        super(props);
        this.root = React.createRef();
    }

    getOverlayClassNames() {
        const { open } = this.props;
        const baseClass = 'block-dialog__overlay';
        const hiddenClass = 'block-dialog__overlay__hidden';
        return !open ? `${baseClass} ${hiddenClass}` : baseClass;
    }

    handleCloseClick = (event) => {
        event.stopPropagation();
        const { onClose } = this.props;
        onClose && onClose();
    };

    handleOverlayClick = (event) => {
        event.stopPropagation();
        const { onClose } = this.props;
        const dialogNode = this.root.current;
        const targetNode = event.target;
        const clickOutsideDialog = dialogNode !== targetNode && !dialogNode.contains(targetNode);
        if (clickOutsideDialog) {
            onClose();
        }
    };

    renderCloseButton() {
        return (
            <button
                onClick={this.handleCloseClick}
                aria-label="Закрыть"
                type="button"
                className="block-dialog__close"
            >
                <img className="block-dialog__close-icon" src={CloseModalIcon} alt="close-modal"/>
            </button>
        );
    }

    render() {
        const { children, title, parentRef } = this.props;
        return (
            <div
                className={this.getOverlayClassNames()}
                onClick={this.handleOverlayClick}
                tabIndex={-1}
                ref={parentRef}
            >
                <div
                    ref={this.root}
                    className='block-dialog'
                >
                    {this.renderCloseButton()}
                    {title && <div className="block-dialog__title">{title}</div>}
                    <div className="block-dialog__content">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}
