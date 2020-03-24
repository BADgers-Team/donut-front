import React, { Component } from 'react';

import './block-cards.scss';
import CardImage from 'assets/img/card-image.jpg';
import Avatar from 'assets/img/michael.jpg';
import SubscribersIcon from 'assets/img/subscribers.svg';

class BlockCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
        };
    }

    componentDidMount() {
        // TODO: запрос за карточками
        // AjaxModule.get(RouterStore.api.posts.all).then((data) => {
        //     this.setState({ posts: data || [] });
        // });

        const card = {
            'id': 123, 
            'subscription_category_id': 124,
            'title': 'My best post', 
            'description': 'My best description',
            'files': [
                CardImage
            ],
            'author': {
                name: 'John Smith',
                avatar: Avatar,
            },
            subscribers: 120,
        };
        const cards = Array(12).fill(card);

        this.setState({
            cards: cards
        });
    }

    render() {
        const { cards } = this.state;
        const cardsNodes = cards.map((card, index) => {
            return <Card key={index} card={card}/>;
        });
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
        return (
            <div className="card">
                <img className="card__preview" src={card.files[0]} alt="preview"/>
                <div className="card__info">
                    <div className="card__title">{card.title}</div>
                    <div className="card__extra-info">
                        <div className="author">
                            <img className="author__avatar" src={card.author.avatar} alt="author"/>
                            <div className="author__name">{card.author.name}</div>
                        </div>
                        <div className="subscribers">
                            <img className="subscribers__icon" src={SubscribersIcon} alt="subscribers"/>
                            <div className="subscribers__count">{card.subscribers}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
