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

import { PostCard } from 'components/blocks/block-cards/block-post-card/block-post-card';
import { SubscriptionCard } from 'components/blocks/block-cards/block-subscription-card/block-subscription-card';
import { AuthorCard } from 'components/blocks/block-cards/block-author-card/block-author-card';
import { inject, observer } from 'mobx-react';

@inject('user')
class BlockCards extends Component {
    render() {
        const { cards, user } = this.props;

        //TODO проверить проверку, если карточки приходят null
        if (!cards) return;
      
        //TODO пофиксить переиспользуемость карточек для поиска и главной
        const postCards = Array.isArray(cards) ? cards : cards.posts;
        let postСardsNodes = null;
        if (postCards && postCards.length > 0) {
            postСardsNodes = postCards.map((card, index) => {
                return <PostCard key={index} card={card} current={user}/>;
            });
        }

        const subscriptionCards = Array.isArray(cards) ? cards : cards.subscriptions;
        let subscriptionСardsNodes = null;
        if (subscriptionCards && subscriptionCards.length > 0) {
            subscriptionСardsNodes = subscriptionCards.map((card, index) => {
                return <SubscriptionCard key={index} subscription={card} current={user}/>;
            });
        }

        const userCards = cards.users;
        let userСardsNodes = null;
        if (userCards && userCards.length > 0) {
            userСardsNodes = userCards.map((card, index) => {
                return <AuthorCard key={index} author={card}/>;
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

