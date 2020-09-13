import React, { Component } from 'react';
import { inject } from 'mobx-react';

import { PostCard } from 'components/blocks/block-cards/block-post-card/block-post-card';
import { SubscriptionCard } from 'components/blocks/block-cards/block-subscription-card/block-subscription-card';
import { AuthorCard } from 'components/blocks/block-cards/block-author-card/block-author-card';
import { BlockEmpty } from 'components/blocks/block-empty/block-empty';

import './block-cards.scss';
import RouteStore from 'store/routes';

@inject('user')
class BlockCards extends Component {
    render() {
        const { cards, user } = this.props;

        //TODO проверить проверку, если карточки приходят null
        if (!cards) return;

        //TODO пофиксить переиспользуемость карточек для поиска и главной
        const postCards = Array.isArray(cards) ? cards : cards.posts;
        const postCardsNodes = postCards?.length > 0 ?
            postCards.map((card) => <PostCard key={card.id} card={card} current={user}/>) : null;

        const subscriptionCards = cards.subscriptions;
        const subscriptionCardsNodes = subscriptionCards?.length > 0 ?
            subscriptionCards.map((card) => <SubscriptionCard key={card.id} subscription={card} current={user}/>) : null;

        const userCards = cards.users;
        const userCardsNodes = userCards?.length > 0 ?
            userCards.map((card) => <AuthorCard key={card.id} author={card}/>) : null;

        const emptyBlock = window.location.pathname === RouteStore.pages.search ? (
            <BlockEmpty
                subtitle="По вашему запросу ничего не найдено. Попробуйте изменить параметры"
            />
        ) : (
            <BlockEmpty
                subtitle="Авторы пока не добавили посты в эту тематику. Станьте первым!"
                linkText="Создать пост"
                link={RouteStore.pages.posts.new}
            />
        );

        return (
            <>
                {(postCards?.length > 0 || subscriptionCards?.length > 0 || userCards?.length > 0) ? (
                    <div className="cards">
                        {postCards?.length > 0 && <div className="cards__items cards-posts">
                            <div className="cards__title">Посты</div>
                            <div className="cards__content">
                                {postCardsNodes}
                            </div>
                            {subscriptionCards?.length > 0 && <hr/>}
                        </div>}

                        {subscriptionCards?.length > 0 && <div className="cards__items cards-posts">
                            <div className="cards__title">Каналы</div>
                            <div className="cards__content">
                                {subscriptionCardsNodes}
                            </div>
                            {userCards?.length > 0 && <hr/>}
                        </div>}

                        {userCards?.length > 0 && <div className="cards__items cards-posts">
                            <div className="cards__title">Авторы</div>
                            <div className="cards__content">
                                {userCardsNodes}
                            </div>
                        </div>}
                    </div>
                ) : emptyBlock
                }
            </>
        );
    }
}

export default BlockCards;

