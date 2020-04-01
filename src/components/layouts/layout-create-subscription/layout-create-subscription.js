import React, { Component } from 'react';
import BlockSubscriptionForm from 'components/blocks/block-subscription-form/block-subscription-form';

import './layout-create-subscription.scss';

class LayoutCreateSubscription extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {    
        return (
            <div className="subscription-container">
                <div className="subscription-header">Создание новой подписки</div>
                <BlockSubscriptionForm />
            </div>
        );
    }
}

export default LayoutCreateSubscription;
