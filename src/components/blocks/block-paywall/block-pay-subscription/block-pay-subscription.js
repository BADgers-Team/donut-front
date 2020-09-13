import React, { Component } from 'react';
import RouterStore from 'store/routes';

import AjaxModule from 'services/ajax';

import { BlockModal } from 'components/blocks/block-modal/block-modal';
import Button from 'components/fragments/button/button';
import { getRouteWithID } from 'services/getRouteWithId';

import './block-pay-subscription.scss';

const MODAL_TITLE = 'Приобретение подписки';

class PaySubcriptionModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open || true,
            sum: 16,
        };
    }

    handlePay = (event) => {
        event.preventDefault();

        const reqBody = {
            payment_type: 'Подписка',
            post_id: this.props.postId,
            subscription_id: this.props.subscriptionId,
            sum: this.props.price,
        };
        
        const { onSuccess } = this.props;

        AjaxModule.post(RouterStore.api.payment.pay, reqBody).then((data) => {
            // const data = {"id":31,"title":"wwefwesdsgывывввввgwegehswrthfewf","description":"wfwef","description_length":0,"visible_type":"Только разовая оплата","activity":"Писательство","files":null,"file_ids":null,"files_count":0,"user_id":2,"author":{"id":2,"login":"AAAAAAAAAAAAAAAA","name":"AAAAAAAAAAAAAAA","email":"mock@user.com","number_of_followers":0,"number_of_subscriptions":0,"number_of_posts":0},"paid":true,"follows":false,"liked":false,"created_at":"2020-04-04 18:03:03 +0000","likes_count":0,"views_count":27};
            console.log('Оплачено');
            onSuccess && onSuccess(data);
        }).catch((error) => {
            console.error(error.message);
        });
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
                    <div className="donat-modal__pay-method">
                        <div className="pay-method__header">Выберите способ оплаты</div>
                        <RadioGroup defaultValue={PAY_METHOD.WALLET} aria-label="gender" name="customized-radios">
                            <div className="pay-method__wallet">
                                <Input type={Input.types.radio} classValue="pay-method__input" value={PAY_METHOD.WALLET} name="freeCheckbox" label="Яндекс кошелёк" material={true} onAction={() => { this.setPayMethod(PAY_METHOD.WALLET) }}/>
                            </div>
                            <div className="pay-method__card">
                                <Input type={Input.types.radio} classValue="pay-method__input" value={PAY_METHOD.CARD} name="freeCheckbox" label="Банковская карта" material={true} onAction={() => { this.setPayMethod(PAY_METHOD.CARD) }}/>
                            </div>
                        </RadioGroup>
                    </div>
                    { this.state.method === PAY_METHOD.WALLET && <div className="donat-modal__warning">
                        Оплата будет производиться через сервис Яндекс.Деньги. После подтверждения пройдите аутентификацию Яндекс для проведения платежа
                    </div> }
                    { this.state.method === PAY_METHOD.CARD && <div className="donat-modal__warning">
                        Оплата будет производиться через сервис Яндекс.Деньги. После подтверждения укажите реквизиты карты для проведения платежа
                    </div> }
                    <Button type={Button.types.submit} text="Приобрести подписку" className="subscription-modal__submit"  onAction={this.handlePay}/>
                </div>
            </BlockModal>
        );
    }
}

export { PaySubcriptionModal };
