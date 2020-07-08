import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { BlockModal } from 'components/blocks/block-modal/block-modal';
import Button from 'components/fragments/button/button';

import RouterStore from 'store/routes';
import AjaxModule from 'services/ajax';
import { getRouteWithID } from 'services/getRouteWithId';

import './block-pay-post.scss';

const MODAL_TITLE = 'Приобретение поста';

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
        // const { onSuccess } = this.props;

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
        const { open, redirect } = this.state;
        const { onClose, title, priceText, postId } = this.props;

        if (redirect) {
            const route = getRouteWithID(RouterStore.api.posts.id, postId);
            return <Redirect to={route} />;
        }

        return (
            <BlockModal
                open={open}
                title={MODAL_TITLE}
                onClose={onClose}
            >
                <div className="post-modal">
                    <div className="post-modal__subtitle">Подтвердите данные платежа</div>
                    <div className="post-modal__title-text">Вы приобретаете доступ к посту: <b>{title}</b></div>
                    <div className="post-modal__price-text">Стоимость поста: <b>{priceText}</b></div>
                    <div className="post-modal__warning">Оплата будет производиться через сервис Яндекс.Деньги. После подтверждения пройдите аутентификацию Яндекс для проведения платежа</div>
                    <Button type={Button.types.submit} text="Подтверждаю" className="post-modal__submit"  onAction={this.handlePayPost}/>
                </div>
            </BlockModal>
        );
    }
}

export { PostPayModal };
