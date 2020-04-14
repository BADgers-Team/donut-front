import React, { Component } from 'react';

import { PostCard } from 'components/blocks/block-cards/block-post-card/block-post-card';

import './block-cards.scss';

class BlockCards extends Component {
    render() {
        const { cards, current } = this.props;
        const cardsNodes = cards.map((card, index) => {
            return <PostCard key={index} card={card} current={current}/>;
        });
        //TODO: сделать экран Данные не найдены
        return (
            <div className="cards">
                {cardsNodes}
            </div>
        );
    }
}

export default BlockCards;
