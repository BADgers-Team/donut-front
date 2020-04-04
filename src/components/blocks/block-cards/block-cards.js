import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getRouteWithID } from 'services/getRouteWithId';
import RouteStore from 'store/routes';

import './block-cards.scss';
import SubscribersIcon from 'assets/img/subscribers.svg';
import CardImage from 'assets/img/card-image.jpg';
import Avatar from 'assets/img/michael.jpg';
import Like from 'components/blocks/block-like/block-like';
import Seen from 'components/blocks/block-seen/block-seen';

const backendUrl = 'http://localhost:8081';

class BlockCards extends Component {
    render() {
        const { cards } = this.props;

        //TODO проверить проверку, если карточки приходят null
        if (!cards) return;
      
        //TODO пофиксить переиспользуемость карточек для поиска и главной
        const postCards = Array.isArray(cards) ? cards : cards.posts;
        let postСardsNodes;
        if (postCards) {
            postСardsNodes = postCards.map((card, index) => {
                return <PostCard key={index} card={card}/>;
            });
        }

        const subscriptionCards = cards.subscriptions;
        let subscriptionСardsNodes;
        if (subscriptionCards) {
            subscriptionСardsNodes = subscriptionCards.map((card, index) => {
                return <SubscriptionCard key={index} card={card}/>;
            });
        }

        const userCards = cards.users;
        let userСardsNodes; 
        if (userCards) {
            userСardsNodes = userCards.map((card, index) => {
                return <UserCard key={index} card={card}/>;
            });
        }

        //TODO: сделать экран Данные не найдены
        return (
            <div className="cards">
                {postCards && <div className="cards__items cards-posts"> 
                    <div className="cards__title">Посты</div>
                    <div className="cards__content">
                        {postСardsNodes}
                    </div>
                    {subscriptionCards && <hr/>}
                </div>}

                {subscriptionCards && <div className="cards__items cards-posts"> 
                    <div className="cards__title">Подписки</div>
                    <div className="cards__content">
                        {subscriptionСardsNodes}
                    </div>
                    {userCards && <hr/>}
                </div>}

                {userCards && <div className="cards__items cards-posts"> 
                    <div className="cards__title">Авторы</div>
                    <div className="cards__content">
                        {userСardsNodes}
                    </div>
                </div>}
            </div>
        );
    }
}

export default BlockCards;


// карточки на переделку по новым макетам

class PostCard extends Component {
    render() {
        const { card } = this.props;
        const cardPreview = card.files ? `${backendUrl}/${card.files[0]}` : CardImage;
        const cardAuthorAvatar = card.author.avatar ? card.author.avatar : Avatar;
        const cardSubscribers = card.subscribers ? card.subscribers : 120;
        const cardRoute = getRouteWithID(RouteStore.api.posts.id, card.id);        
        const cardDate = card.date || '23 февраля 2019';
        const postId = card.id;
        const cardLikes = card.likes_count || 0;
        const currentUserLiked = card.liked;
        const seen = card.views_count || 1;

        return (
            <Link className="card" to={cardRoute}>
                <div className="card__date">{cardDate}</div>
                <img className="card__preview" src={cardPreview} alt="preview"/>
                <div className="card__info">
                    <div className="card__title">{card.title}</div>
                    <div className="card__extra-info">
                        <div className="author">
                            <img className="author__avatar" src={cardAuthorAvatar} alt="author"/>
                            <div className="author__name">{card.author.name}</div>
                        </div>
                        <div className="subscribers">
                            <Like likesCount={cardLikes} currentUserLiked={currentUserLiked} postId={postId}
                                likedClass="post-static__info__icon" 
                                dislikedClass="post-static__info__icon post-static__info-disliked__icon" 
                                textClass="post-static__info__text"/>
                            <Seen seen={seen} 
                                iconClass="post-static__info__icon" 
                                textClass="post-static__info__text"/>                       
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}


class SubscriptionCard extends Component {
    render() {
        const { card } = this.props;
        const cardPreview = CardImage;
        const cardAuthorAvatar = Avatar;
        const cardSubscribers = card.subscribers ? card.subscribers : 120;

        return (
            <Link className="card">
                <img className="card__preview" src={cardPreview} alt="preview"/>
                <div className="card__info">
                    <div className="card__title">{card.title}</div>
                    <div className="card__extra-info">
                        <div className="author">
                            <img className="author__avatar" src={cardAuthorAvatar} alt="author"/>
                        </div>
                        <div className="subscribers">
                            <img className="subscribers__icon" src={SubscribersIcon} alt="subscribers"/>
                            <div className="subscribers__count">{cardSubscribers}</div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}


class UserCard extends Component {
    render() {
        const { card } = this.props;
        const cardPreview = CardImage;
        const cardAuthorAvatar = Avatar;
        const cardSubscribers = card.subscribers ? card.subscribers : 120;

        return (
            <Link className="card">
                <img className="card__preview" src={cardPreview} alt="preview"/>
                <div className="card__info">
                    <div className="card__title">{card.login}</div>
                    <div className="card__extra-info">
                        <div className="author">
                            <img className="author__avatar" src={cardAuthorAvatar} alt="author"/>
                            <div className="author__name">{card.name}</div>
                        </div>
                        <div className="subscribers">
                            <img className="subscribers__icon" src={SubscribersIcon} alt="subscribers"/>
                            <div className="subscribers__count">{cardSubscribers}</div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}
