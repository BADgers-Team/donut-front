import React, { Component } from 'react';

import './block-subscription.scss';
import Button from 'components/fragments/button/button';
import BlockPayment from 'components/blocks/block-payment/block-payment';

class BlockSubscription extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
        };
    }

    openModal = () => {
        this.setState({ showModal: true });
    }
    
    closeModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        const { subscription } = this.props;
        return (
            <>
                <BlockPayment 
                isOpen={this.state.showModal}
                closeModal={this.closeModal}/>

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
