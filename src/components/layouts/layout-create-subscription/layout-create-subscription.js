import React, { Component } from 'react';
import { BlockSubscriptionForm } from 'components/blocks/block-subscription-form/block-subscription-form';

import './layout-create-subscription.scss';

class LayoutCreateSubscription extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {    
        const { showToast } = this.props;
        return (
            <div className="subscription-container">
                <BlockSubscriptionForm showToast={showToast}/>
            </div>
        );
    }
}

export default LayoutCreateSubscription;
