import React, { Component } from 'react';

import './block-cards.scss';
import SubscribersIcon from 'assets/img/subscribers.svg';
import CardImage from 'assets/img/card-image.jpg';
import Avatar from 'assets/img/michael.jpg';

const backendUrl = 'http://localhost:8081';

class BlockCards extends Component {
    render() {
        const { cards } = this.props;
        const cardsNodes = cards.map((card, index) => {
            return <Card key={index} card={card}/>;
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

class Card extends Component {
    render() {
        const { card } = this.props;
        const cardPreview = card.files ? `${backendUrl}/${card.files[0]}` : CardImage;
        const cardAuthorAvatar = card.author.avatar ? card.author.avatar : Avatar;
        const cardSubscribers = card.subscribers ? card.subscribers : 120;

        return (
            <div className="card">
                <img className="card__preview" src={cardPreview} alt="preview"/>
                <div className="card__info">
                    <div className="card__title">{card.title}</div>
                    <div className="card__extra-info">
                        <div className="author">
                            <img className="author__avatar" src={cardAuthorAvatar} alt="author"/>
                            <div className="author__name">{card.author.name}</div>
                        </div>
                        <div className="subscribers">
                            <img className="subscribers__icon" src={SubscribersIcon} alt="subscribers"/>
                            <div className="subscribers__count">{cardSubscribers}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
