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
        let cardsNodes1;
        let cardsNodes2;
        let cardsNodes3;
        let cardsNodes4;
        if (!cards) {
            cardsNodes = null;
        } else {
            cardsNodes = cards.posts.map((card, index) => {
                return <PostCard key={index} card={card} current={current}/>;
            });
            cardsNodes1 = cards.users.map((card, index) => {
                return <AuthorCard key={index} author={card}/>;
            });
            cardsNodes2 = cards.subscriptions.map((card, index) => {
                return <SubscriptionCard key={index} subscription={card} current={current} type={SubscriptionCard.types.profile}/>;
            });
            cardsNodes3 = cards.subscriptions.map((card, index) => {
                return <SubscriptionCard key={index} subscription={card} current={current}/>;
            });
            cardsNodes4 = cards.posts.map((card, index) => {
                return <ProfilePostCard key={index} post={card}/>;
            });
        }

        //TODO: сделать экран Данные не найдены
        return (
            <div className="cards">
                {cardsNodes}
                {cardsNodes1}
                {cardsNodes2}
                {cardsNodes3}
                {cardsNodes4}
            </div>
        );
    }
}

export default BlockCards;
