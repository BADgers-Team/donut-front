import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import RouterStore from 'store/routes';

import AjaxModule from 'services/ajax';

import { BlockModal } from 'components/blocks/block-modal/block-modal';
import Button from 'components/fragments/button/button';
import { getRouteWithID } from 'services/getRouteWithId';

import './donat-pay-modal.scss';

const MODAL_TITLE = 'Платеж';

class DonatPayModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open || true,
            sum: 16,
            redirect: false,
        };
    }

    handlePay = (event) => {
        event.preventDefault();

        const reqBody = {
            payment_type: 'Донат',
            post_id: this.props.id,
            sum: this.props.price,
        };

        const { onSuccess } = this.props;

        AjaxModule.post(RouterStore.api.pay, reqBody).then(() => {
            console.log('Оплачено');
            onSuccess && onSuccess();
        }).catch((error) => {
            console.error(error.message);
        });
    };

    render() {
        const { open } = this.state;
        const { onClose, title, price } = this.props;

        return (
            <BlockModal
                open={open}
                title={MODAL_TITLE}
                onClose={onClose}
            >
                <div className="donat-modal">
                    <div className="donat-modal__title-text">Вы поддерживаете пост:</div>
                    <div className="donat-modal__title">{title}</div>
                    <div className="donat-modal__price-text">Стоимость поддержки:</div>
                    <div className="donat-modal__price">{price}</div>
                    <Button type={Button.types.submit} value="Поддержать пост" className="donat-modal__submit"  onAction={this.handlePay}/>
                </div>
            </BlockModal>
        );
    }
}

export { DonatPayModal };
