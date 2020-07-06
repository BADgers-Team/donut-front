import React, { Component } from 'react';
import Button from 'components/fragments/button/button';
import { PostPayModal } from 'components/blocks/block-paywall/block-pay-post/block-pay-post';
import { PaySubcriptionModal } from 'components/blocks/block-paywall/block-pay-subscription/block-pay-subscription';
import { PRIVACY } from 'store/const';
import { disableScroll, enableScroll } from 'services/scroll';
import { inject } from 'mobx-react';
import { Redirect } from "react-router-dom";
import RouterStore from 'store/routes';

import './block-paywall.scss';

const PRIVACY_MSG = [
    'Пост доступен только для подписчиков',
    'Пост доступен только по единоразовой оплате',
    'Пост доступен только для подписчиков или по единоразовой оплате',
];

@inject('user')
class BlockPaywall extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPostPay: false,
            showSubcriptionPay: false,
            canView: false,
            post: null,
            redirect: false,
        }; 
    }

    componentDidMount() {
        disableScroll();
    }

    componentWillUnmount() {
        enableScroll();
    }

    openSubcriptionPayModal = () => {

        const { user } = this.props;

        if (!user.login) {
            this.setState({ redirect: true });
            return
        }

        this.setState({ showSubcriptionPay: true });
    }
    
    closeSubcriptionPayModal = () => {
        this.setState({ showSubcriptionPay: false });
    }

    openPostPayModal = () => {
        const { user, post } = this.props;
        if (!user.login || !post) {
            this.setState({ redirect: true });
            return;
        }

        sessionStorage.setItem('payment_info', JSON.stringify({
            sum: post.sum || 0,
            payment_type: 'Пост',
            id: post.id
        }));

        this.setState({ showPostPay: true });
    };
    
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
        const { redirect } = this.state;
        const { post } = this.props;
        const teaser = post.teaser || 'Автор не добавил тизер :(';
        
        const pricePost = post.sum ? `${post.sum} ₽` : 'бесплатно';
        const priceSubcription = post.subscription_sum ? `${post.subscription_sum} ₽` : 'Бесплатно';
        const controls = this._getControls();

        if (redirect) {
            return <Redirect to={RouterStore.pages.user.login} />;
        }
        return (
            <>
                {this.state.showPostPay && (
                    <PostPayModal
                        postId={post.id}
                        title={post.title}
                        price={post.sum}
                        priceText={pricePost}
                        onClose={this.closePostPayModal} onSuccess={this.handleSuccessChangePost}
                    />
                )}

                {this.state.showSubcriptionPay && <PaySubcriptionModal   
                postId={post.id}
                subscriptionId={post.subscription_id}
                title={post.subscription}   
                price={post.subscription_sum}    
                priceText={priceSubcription}                         
                onClose={this.closeSubcriptionPayModal} onSuccess={this.handleSuccessChangeSubcription}/>}

                <div className="paywall">
                    <div className="paywall__info">{teaser}</div>
                    {controls}
                </div>
            </>
        );
    }

    _getControls() {
        const { post } = this.props;
        const priceButtonText = post.sum ? `Оплатить ${post.sum} ₽` : 'Открыть бесплатно';

        switch (this.props.post.visible_type) {
        case (PRIVACY.SUBSCRIPTION):
            return (
                <>
                    <div className="paywall__message__subscription">
                        {PRIVACY_MSG[0]}
                    </div>
                    <div className="paywall__controls__subscription" onClick={this.openSubcriptionPayModal}>
                        <Button text="Подписаться" type={Button.types.link}/>
                    </div>
                </>
            );
        case (PRIVACY.PRICE):
            return (
                <>
                    <div className="paywall__message__price">
                        {PRIVACY_MSG[1]}
                    </div>
                    <div className="paywall__controls__price" onClick={this.openPostPayModal}>
                        <Button text={priceButtonText} type={Button.types.link}/>
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
                        <div className="paywall__controls__subscription" onClick={this.openSubcriptionPayModal}>
                            <Button text="Подписаться" type={Button.types.link}/>
                        </div>
                        <div className="paywall__controls__price" onClick={this.openPostPayModal}>
                            <Button text={priceButtonText} type={Button.types.link}/>
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
