import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import RouterStore from 'store/routes';

import AjaxModule from 'services/ajax';

import { BlockModal } from 'components/blocks/block-modal/block-modal';
import Button from 'components/fragments/button/button';
import { getRouteWithID } from 'services/getRouteWithId';

import './block-pay-subscription.scss';

const MODAL_TITLE = 'Покупка подписки';

class PaySubcriptionModal extends Component {
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
            payment_type: 'Подписка',
            post_id: this.props.post_id,
            subscription_id: this.props.subscription_id,
            sum: this.props.price,
        };
        
        const { onSuccess } = this.props;

        AjaxModule.post(RouterStore.api.pay, reqBody).then((data) => {
            // const data = {"id":31,"title":"wwefwesdsgывывввввgwegehswrthfewf","description":"wfwef","description_length":0,"visible_type":"Только разовая оплата","activity":"Писательство","files":null,"file_ids":null,"files_count":0,"user_id":2,"author":{"id":2,"login":"AAAAAAAAAAAAAAAA","name":"AAAAAAAAAAAAAAA","email":"mock@user.com","number_of_followers":0,"number_of_subscriptions":0,"number_of_posts":0},"paid":true,"follows":false,"liked":false,"created_at":"2020-04-04 18:03:03 +0000","likes_count":0,"views_count":27};
            console.log('Оплачено');
            onSuccess && onSuccess(data);
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
                onClose={onClose}>
                <div>
                    <div>Вы покупаете подписку:</div>
                    <div>{title}</div>
                    <div>Стоимость подписки:</div>
                    <div>{price}</div>
                    <Button type={Button.types.submit} value="Купить подписку" className="subscription-modal__submit"  onAction={this.handlePay}/>
                </div>
            </BlockModal>
        );
    }
}

export { PaySubcriptionModal };
