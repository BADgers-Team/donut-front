import React, { Component } from 'react';

import './block-subscription.scss';
import Button from 'components/fragments/button/button';

class BlockSubscription extends Component {
    render() {
        const { subscription } = this.props;
        return (
            <div className="author-subscription">
                <div className="author-subscription__title">{subscription.title}</div>
                <div className="author-subscription__price">{`${subscription.sum} ₽ в месяц`}</div>
                <div className="author-subscription__description">{subscription.description}</div>
                <Button className="author-subscription__button" text={`Подписаться за ${subscription.sum} ₽`} type={Button.types.block}/>
            </div>
        );
    }
}

export { BlockSubscription };
