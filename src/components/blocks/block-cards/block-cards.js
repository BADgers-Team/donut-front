import React, { Component } from 'react';

import { PostCard } from 'components/blocks/block-cards/block-post-card/block-post-card';
import { SubscriptionCard } from 'components/blocks/block-cards/block-subscription-card/block-subscription-card';
import { ProfilePostCard } from 'components/blocks/block-cards/block-profile-post-card/block-profile-post-card';
import { AuthorCard } from 'components/blocks/block-cards/block-author-card/block-author-card';

import './block-cards.scss';

class BlockCards extends Component {
    render() {
        const { cards, current } = this.props;
        let cardsNodes;
        if (!cards) {
            cardsNodes = null;
        } else {
            cardsNodes = cards.posts.map((card, index) => {
                return <PostCard key={index} card={card} current={current}/>;
            });
            // cardsNodes = cards.users.map((card, index) => {
            //     return <AuthorCard key={index} author={card}/>;
            // });
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
