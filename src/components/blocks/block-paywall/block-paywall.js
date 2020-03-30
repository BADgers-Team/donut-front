import React, { Component } from 'react';
import Button from 'components/fragments/button/button';
import { PRIVACY } from 'store/const';
import { disableScroll, enableScroll } from 'services/scroll';

import './block-paywall.scss';

const PRIVACY_MSG = [
    'Пост доступен только для подписчиков',
    'Пост доступен только по единоразовой оплате',
    'Пост доступен только для подписчиков или по единоразовой оплате',
];

class BlockPaywall extends Component {
    componentDidMount() {
        disableScroll();
    }

    componentWillUnmount() {
        enableScroll();
    }

    render() {
        const { post } = this.props;
        const tizer = post.tizer || `Всегда незаметные вещи могут быть гораздо важнее чересчур привлекательных. 
                                     Этот пост о невероятной силе человеческого слова в описании природы`;
        const price = post.price || 150;
        let controls;
        switch (post.visible_type) {
        case (PRIVACY.SUBSCRIPTION):
            controls = (
                <>
                    <div className="paywall__message__subscription">
                        {PRIVACY_MSG[0]}
                    </div>
                    <div className="paywall__controls__subscription">
                        <Button text="Подписаться" type={Button.types.link}/>
                    </div>
                </>
            );
            break;
        case (PRIVACY.PRICE):
            controls = (
                <>
                    <div className="paywall__message__price">
                        {PRIVACY_MSG[1]}
                    </div>
                    <div className="paywall__controls__price">
                        <Button text={`Оплатить ${price} ₽`} type={Button.types.link}/>
                    </div>
                </>
            );
            break;
        case (PRIVACY.SUBSCRIPTION_PRICE):
            controls = (
                <>
                    <div className="paywall__message__price">
                        {PRIVACY_MSG[2]}
                    </div>
                    <div className="paywall__controls">
                        <div className="paywall__controls__subscription">
                            <Button text="Подписаться" type={Button.types.link}/>
                        </div>
                        <div className="paywall__controls__price">
                            <Button text={`Оплатить ${price} ₽`} type={Button.types.link}/>
                        </div>
                    </div>
                </>
            );
            break;
        }

        return (
            <div className="paywall">
                <div className="paywall__info">{tizer}</div>
                {controls}
            </div>
        );
    }
}

export { BlockPaywall };
