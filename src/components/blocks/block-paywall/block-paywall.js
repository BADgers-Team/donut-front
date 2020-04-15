import React, { Component } from 'react';
import Button from 'components/fragments/button/button';
import { PostPayModal } from 'components/blocks/block-paywall/block-pay-post/block-pay-post';
import { PaySubcriptionModal } from 'components/blocks/block-paywall/block-pay-subscription/block-pay-subscription';
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
            showPostPay: false,
            showSubcriptionPay: false,
            canView: false,
            post: null,
        }; 
    }

    componentDidMount() {
        disableScroll();
    }

    componentWillUnmount() {
        enableScroll();
    }

    openSubcriptionPayModal = () => {
        this.setState({ showSubcriptionPay: true });
    }
    
    closeSubcriptionPayModal = () => {
        this.setState({ showSubcriptionPay: false });
    }

    openPostPayModal = () => {
        this.setState({ showPostPay: true });
    }
    
    closePostPayModal = () => {
        this.setState({ showPostPay: false });
    }

    handleSuccessChangePost = (data) => {
        this.closePostPayModal();

        this.setState({post: data}, () => {
            const { onChange } = this.props;
            onChange && onChange(this.state.post);
        });
    }

    handleSuccessChangeSubcription = (data) => {
        this.closeSubcriptionPayModal();

        this.setState({post: data}, () => {
            const { onChange } = this.props;
            onChange && onChange(this.state.post);
        });
    }

    render() {
        const { post } = this.props;
        const tizer = post.tizer || `Всегда незаметные вещи могут быть гораздо важнее чересчур привлекательных. 
                                     Этот пост о невероятной силе человеческого слова в описании природы`;
        
        const pricePost = post.sum ? `${post.sum} ₽` : 'Бесплатно';
        const priceSubcription = post.subscription_sum ? `${post.subscription_sum} ₽` : 'Бесплатно';
        const controls = this._getControls();

        return (
            <>
                {this.state.showPostPay && <PostPayModal   
                postId={post.id}
                title={post.title}  
                price={post.sum}    
                priceText={pricePost}                        
                onClose={this.closePostPayModal} onSuccess={this.handleSuccessChangePost}/>}

                {this.state.showSubcriptionPay && <PaySubcriptionModal   
                postId={post.id}
                subscriptionId={post.subscription_id}
                title={post.subscription}   
                price={post.subscription_sum}    
                priceText={priceSubcription}                         
                onClose={this.closeSubcriptionPayModal} onSuccess={this.handleSuccessChangeSubcription}/>}

                <div className="paywall">
                    <div className="paywall__info">{tizer}</div>
                    {controls}
                </div>
            </>
        );
    }

    _getControls() {
        switch (this.props.post.visible_type) {
        case (PRIVACY.SUBSCRIPTION):
            return (
                <>
                    <div className="paywall__message__subscription">
                        {PRIVACY_MSG[0]}
                    </div>
                    <div className="paywall__controls__subscription">
                        <Button text="Подписаться" type={Button.types.link} onAction={this.openSubcriptionPayModal}/>
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
                        <Button text="Оплатить" type={Button.types.link} onAction={this.openPostPayModal}/>
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
                            <Button text="Подписаться" type={Button.types.link} onAction={this.openSubcriptionPayModal}/>
                        </div>
                        <div className="paywall__controls__price">
                            <Button text="Оплатить" type={Button.types.link} onAction={this.openPostPayModal}/>
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
