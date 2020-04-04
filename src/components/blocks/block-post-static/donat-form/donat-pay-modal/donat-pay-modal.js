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

        AjaxModule.post(RouterStore.api.pay, reqBody).then(() => {
            console.log('Оплачено');
            this.setState({ redirect: true });
        }).catch((error) => {
            // console.error(error.message);
        });
    };

    render() {
        const { open, redirect } = this.state;
        const { onClose, title, price, id } = this.props;

        if (redirect) {
            const route = getRouteWithID(RouterStore.api.posts.id, id);
            return <Redirect to={route} />
        }
        return (
            <BlockModal
                open={open}
                title={MODAL_TITLE}
                onClose={onClose}
            >
                <div>
                    <div>Вы поддерживаете пост:</div>
                    <div>{title}</div>
                    <div>Стоимость поддержки:</div>
                    <div>{price}</div>
                    <Button type={Button.types.submit} value="Поддержать пост" className="donat-modal__submit"  onAction={this.handlePay}/>
                </div>
            </BlockModal>
        );
    }
}

export { DonatPayModal };
