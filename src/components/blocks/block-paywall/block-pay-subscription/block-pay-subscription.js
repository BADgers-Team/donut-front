import React, { Component } from 'react';
import RouterStore from 'store/routes';

import AjaxModule from 'services/ajax';

import { BlockModal } from 'components/blocks/block-modal/block-modal';
import Button from 'components/fragments/button/button';
import { getRouteWithID } from 'services/getRouteWithId';
import { PAY_METHOD } from 'store/const';
import Input from 'components/fragments/input/input';
import RadioGroup from '@material-ui/core/RadioGroup';

import Loader from 'react-loader-spinner';

import './block-pay-subscription.scss';

const MODAL_TITLE = 'Приобретение подписки';

class PaySubcriptionModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open || true,
            sum: 16,
            method: PAY_METHOD.WALLET,
            showLoader: false,
        };
    }

    handlePay = (event) => {
        event.preventDefault();

        const reqBody = {
            payment_type: 'Подписка',
            post_id: this.props.postId,
            subscription_id: this.props.subscriptionId,
            sum: this.props.price,
            method: PAY_METHOD.CARD,
        };
        
        const { onSuccess } = this.props;
        const post = JSON.parse(sessionStorage.getItem('payment_info'));

        this.setState({ showLoader: true });

        debugger

        AjaxModule.doAxioPost(RouterStore.api.payment.card, reqBody)
        .then((response) => {
            sessionStorage.setItem('payment_info', JSON.stringify({...post, payment_method: PAY_METHOD.CARD}));
            
            this.setState({ showLoader: false });

            window.location.replace(response.data.url);
        }).catch((error) => {
            console.error(error.message);
            this.setState({ showLoader: false });
        });
    };

    setPayMethod = (payMethod) => {
        this.setState({ method: payMethod });
    };

    render() {
        const { open } = this.state;
        const { onClose, title, priceText } = this.props;

        return (
            <BlockModal
                open={open}
                title={MODAL_TITLE}
                onClose={onClose}>
                <div className="subscription-modal">
                    <div className="subscription-modal__title-text">Вы приобретаете подписку:</div>
                    <div className="subscription-modal__title">{title}</div>
                    <div className="subscription-modal__price-text">Стоимость подписки:</div>
                    <div className="subscription-modal__price">{priceText}</div>
                    <div className="donat-modal__warning">
                        Оплата будет производиться через сервис Яндекс.Деньги. После подтверждения укажите реквизиты карты для проведения первого платежа. Следующие платежи будут ежемесячно проведены автоматически 
                    </div>
                    { !this.state.showLoader && <Button type={Button.types.submit} text="Приобрести подписку" className="subscription-modal__submit"  onAction={this.handlePay}/> }
                    { this.state.showLoader && 
                        <div className="donat-modal__loader">
                            <Loader
                                type="Oval"
                                color="#ffffff"
                                height={35}
                                width={35}/>
                        </div>
                    }
                </div>
            </BlockModal>
        );
    }
}

export { PaySubcriptionModal };
