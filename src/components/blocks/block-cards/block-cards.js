import React, { Component } from 'react';

import { PostCard } from 'components/blocks/block-cards/block-post-card/block-post-card';
import { SubscriptionCard } from 'components/blocks/block-cards/block-subscription-card/block-subscription-card';

import './block-cards.scss';

class BlockCards extends Component {
    render() {
        const { cards, current } = this.props;
        let cardsNodes;
        if (!cards) {
            cardsNodes = null;
        } else {
            cardsNodes = cards.subscriptions.map((card, index) => {
                return <SubscriptionCard key={index} subscription={card} current={current}/>;
            });
        }

        //TODO: сделать экран Данные не найдены
        return (
            <div className="cards">
                {cardsNodes}
            </div>
        );
    }
}

export default BlockCards;
