import React, { Component } from 'react';
import Button from 'components/fragments/button/button';
import BlockPayment from 'components/blocks/block-payment/block-payment';
import { PRIVACY } from 'store/const';
import { disableScroll, enableScroll } from 'services/scroll';

import './block-paywall.scss';

const PRIVACY_MSG = [
    'Пост доступен только для подписчиков',
    'Пост доступен только по единоразовой оплате',
    'Пост доступен только для подписчиков или по единоразовой оплате',
];

class BlockPaywall extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
        }; 
    }

    componentDidMount() {
        disableScroll();
    }

    componentWillUnmount() {
        enableScroll();
    }

    openModal = () => {
        this.setState({ showModal: true });
    }
    
    closeModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        const { post } = this.props;
        const tizer = post.tizer || `Всегда незаметные вещи могут быть гораздо важнее чересчур привлекательных. 
                                     Этот пост о невероятной силе человеческого слова в описании природы`;
        const price = post.price || 150;
        const controls = this._getControls(price, this.openModal);

        return (
            <>
                <BlockPayment 
                isOpen={this.state.showModal}
                closeModal={this.closeModal}/>

                <div className="paywall">
                    <div className="paywall__info">{tizer}</div>
                    {controls}
                </div>
            </>
        );
    }

    _getControls(price, openModal) {
        switch (this.props.post.visible_type) {
        case (PRIVACY.SUBSCRIPTION):
            return (
                <>
                    <div className="paywall__message__subscription">
                        {PRIVACY_MSG[0]}
                    </div>
                    <div className="paywall__controls__subscription">
                        <Button text="Подписаться" type={Button.types.link} onAction={openModal}/>
                    </div>
                </>
            );
        case (PRIVACY.PRICE):
            return (
                <>
                    <div className="paywall__message__price">
                        {PRIVACY_MSG[1]}
                    </div>
                    <div className="paywall__controls__price">
                        <Button text={`Оплатить ${price} ₽`} type={Button.types.link} onAction={openModal}/>
                    </div>
                </>
            );
        case (PRIVACY.SUBSCRIPTION_PRICE):
            return (
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
        default:
            return null;
        }
    }
}

export { BlockPaywall };
