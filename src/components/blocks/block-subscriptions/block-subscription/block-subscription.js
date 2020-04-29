import React, { Component } from 'react';

import './block-subscription.scss';
import Button from 'components/fragments/button/button';
import { PaySubcriptionModal } from 'components/blocks/block-paywall/block-pay-subscription/block-pay-subscription';

import { Redirect } from "react-router-dom";
import RouterStore from 'store/routes';
import { inject } from 'mobx-react';

@inject('user')
class BlockSubscription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null,
            showSubcriptionPay: false,
            redirect: false,
        };
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
        window.location.reload();
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
        const { subscription, current, user } = this.props;
        const price = subscription.sum ? `${subscription.sum} ₽ в месяц` : 'Бесплатно';
        
        if (redirect) {
            return <Redirect to={RouterStore.pages.user.login} />
        }
        return (
            <>
                {this.state.showSubcriptionPay && <PaySubcriptionModal   
                subscriptionId={subscription.id}
                title={subscription.title}   
                priceText={price}     
                price={subscription.sum}                        
                onClose={this.closeSubcriptionPayModal} onSuccess={this.handleSuccessChangeSubcription}/>} 

                <div className="author-subscription">
                    <div className="author-subscription__title">{subscription.title}</div>
                    <div className="author-subscription__price">{price}</div>
                    <div className="author-subscription__description">{subscription.description}</div>
                    {(user.login !== current?.login && !subscription.follows) && (
                        <Button className="author-subscription__button" onAction={this.openSubcriptionPayModal} text='Подписаться' type={Button.types.block}/>
                    )}
                </div>
            </>
        );
    }
}

export { BlockSubscription };
