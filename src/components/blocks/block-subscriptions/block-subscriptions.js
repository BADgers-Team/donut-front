import React, { Component } from 'react';

import './block-subscriptions.scss';

class BlockSubscriptions extends Component {
    render() {
        const { user } = this.props;
        return (
            <div className="author-subscriptions">
                <div className="author-subscriptions__title">Подписки</div>
            </div>
        );
    }
}

export { BlockSubscriptions };
