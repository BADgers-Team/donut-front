import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import RouterStore from 'store/routes';

import AjaxModule from 'services/ajax';

import { BlockModal } from 'components/blocks/block-modal/block-modal';
import Button from 'components/fragments/button/button';
import { getRouteWithID } from 'services/getRouteWithId';

import './block-pay-post.scss';

const MODAL_TITLE = 'Платеж';

class PostPayModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open || true,
            sum: 16,
            redirect: false,
        };
    }

    handlePayPost = (event) => {
        event.preventDefault();

        const reqBody = {
            payment_type: 'Пост',
            post_id: this.props.post_id,
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
        const { open, redirect } = this.state;
        const { onClose, title, price, post_id } = this.props;

        if (redirect) {
            const route = getRouteWithID(RouterStore.api.posts.id, post_id);
            return <Redirect to={route} />
        }
        return (
            <BlockModal
                open={open}
                title={MODAL_TITLE}
                onClose={onClose}
            >
                <div>
                    <div>Вы покупаете доступ к посту:</div>
                    <div>{title}</div>
                    <div>Стоимость поста:</div>
                    <div>{price}</div>
                    <Button type={Button.types.submit} value="Купить пост" className="post-modal__submit"  onAction={this.handlePayPost}/>
                </div>
            </BlockModal>
        );
    }
}

export { PostPayModal };
