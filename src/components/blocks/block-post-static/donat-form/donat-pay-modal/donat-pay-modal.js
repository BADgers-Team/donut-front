import React, { Component } from 'react';
import RouterStore from 'store/routes';

import AjaxModule from 'services/ajax';

import { BlockModal } from 'components/blocks/block-modal/block-modal';
import Button from 'components/fragments/button/button';

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

        // const reqBody = {
        //     payment_type: 'Донат',
        //     post_id: this.props.id,
        //     sum: this.props.price,
        // };

        const { onSuccess } = this.props;

        // AjaxModule.post(RouterStore.api.pay, reqBody).then(() => {
        //     console.log('Оплачено');
        //     onSuccess && onSuccess();
        // }).catch((error) => {
        //     console.error(error.message);
        // });

        AjaxModule.doAxioGet(RouterStore.api.payment.authorize)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error('Не удалось получить подключиться к авторизации Яндекс.Денег');
                }
                window.location.replace(response.data.url);
                // onSuccess?.();
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    render() {
        const { open } = this.state;
        const { onClose, title, price, author } = this.props;

        return (
            <BlockModal
                open={open}
                title={MODAL_TITLE}
                onClose={onClose}
            >
                <div className="donat-modal">
                    <div className="donat-modal__subtitle">Подтвердите данные платежа</div>
                    <div className="donat-modal__title-text">Вы поддерживаете автора: <b>{author.name}</b></div>
                    <div className="donat-modal__price-text">Сумма поддержки: <b>{price} ₽</b></div>
                    <div className="donat-modal__warning">Оплата будет производиться через сервис Яндекс.Деньги. После подтверждения пройдите аутентификацию Яндекс для проведения платежа</div>
                    <Button type={Button.types.submit} text="Подтверждаю" className="donat-modal__submit"  onAction={this.handlePay}/>
                </div>
            </BlockModal>
        );
    }
}

export { DonatPayModal };
