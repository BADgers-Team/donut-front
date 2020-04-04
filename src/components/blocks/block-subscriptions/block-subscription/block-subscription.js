import React, { Component } from 'react';

import './block-subscription.scss';
import Button from 'components/fragments/button/button';
import { PaySubcriptionModal } from 'components/blocks/block-paywall/block-pay-subscription/block-pay-subscription';


class BlockSubscription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null,
            showSubcriptionPay: false,
        };
    }

    openSubcriptionPayModal = () => {
        this.setState({ showSubcriptionPay: true });
    }
    
    closeSubcriptionPayModal = () => {
        this.setState({ showSubcriptionPay: false });
    }

    handleSuccessChangeSubcription = (data) => {
        this.closeSubcriptionPayModal();

        this.setState({post: data}, () => {
            const { onChange } = this.props;
            onChange && onChange(this.state.post);
        });
    }

    render() {
        const { subscription } = this.props;
        return (
            <>
                {/* {this.state.showSubcriptionPay && <PaySubcriptionModal   
                post_id={post.id}
                subscription_id={post.subscription_id}
                title={post.subscription}   
                price={post.price}                        
                onClose={this.closeSubcriptionPayModal} onSuccess={this.handleSuccessChangeSubcription}/>} */}


                <div className="author-subscription">
                    <div className="author-subscription__title">{subscription.title}</div>
                    <div className="author-subscription__price">{`${subscription.sum} ₽ в месяц`}</div>
                    <div className="author-subscription__description">{subscription.description}</div>
                    <Button className="author-subscription__button" onAction={this.openModal} text={`Подписаться за ${subscription.sum} ₽`} type={Button.types.block}/>
                </div>
            </>
        );
    }
}

export { BlockSubscription };
