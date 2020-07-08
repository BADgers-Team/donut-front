import React, { Component } from 'react';
import { inject } from 'mobx-react';

import { PostCard } from 'components/blocks/block-cards/block-post-card/block-post-card';
import { SubscriptionCard } from 'components/blocks/block-cards/block-subscription-card/block-subscription-card';
import { BlockEmpty } from 'components/blocks/block-empty/block-empty';
import RouteStore from 'store/routes';

import './block-feed-cards.scss';

export const FEED_TABS = {
    'POSTS': 'Посты',
    'SUBSCRIPTIONS': 'Подписки',
};

@inject('user')
class BlockFeedCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: FEED_TABS.POSTS,
        };
    }

    handlePostTabClick = () => {           
        this.setState({ selectedTab: FEED_TABS.POSTS});
    };

    handleSubscriptionTabClick = () => {
        this.setState({ selectedTab: FEED_TABS.SUBSCRIPTIONS});
    };

    render() {
        const { posts, subscriptions, user } = this.props;
        const { selectedTab } = this.state;
      
        const postCards = posts ? posts : [];
        const postСardsNodes = postCards.length > 0 ?
                postCards.map((card) => {
                    return <PostCard key={card.id} card={card} current={user}/>;
                }) : null;

        const subscriptionCards = subscriptions ? subscriptions : [];
        const subscriptionСardsNodes = subscriptionCards.length !== 0 ?
                subscriptionCards.map((card, index) => {
                    return <SubscriptionCard key={index} subscription={card} current={user}/>;
                }) : null;

        let cardsNodes;
        switch (selectedTab) {
            case FEED_TABS.POSTS:
                cardsNodes = (
                    <>
                        {postCards.length > 0 ? (
                            <div className="cards__items cards-posts">
                                <div className="cards__content">
                                    {postСardsNodes}
                                </div>
                            </div>
                        ) : (
                            <BlockEmpty
                                subtitle="После покупки поста или оформления подписки здесь появятся приобретенные посты :)"
                                linkText="Перейти в подборки"
                                link={RouteStore.pages.collections}
                            />
                        )}
                    </>
                );
                break;
            case FEED_TABS.SUBSCRIPTIONS:
                cardsNodes = (
                    <>
                        {subscriptionCards.length > 0 ? (
                            <div className="cards__items cards-posts">
                                <div className="cards__content">
                                    {subscriptionСardsNodes}
                                </div>
                            </div>
                        ) : (
                            <BlockEmpty
                                subtitle="После оформления подписки здесь будут хранится Ваши подписки :)"
                            />
                        )}
                    </>
                );
                break;
        }

        const activePostsTabClass = selectedTab === FEED_TABS.POSTS ? 'active-tab' : '';
        const activeSubscriptionTabClass = selectedTab === FEED_TABS.SUBSCRIPTIONS ? 'active-tab' : '';
        
        const activePostsLineClass = selectedTab === FEED_TABS.POSTS ? 'active-line' : '';
        const activeSubscriptionLineClass = selectedTab === FEED_TABS.SUBSCRIPTIONS ? 'active-line' : '';
        
        return (
            <div className="feed-cards">
                <div className="feed-tabs">
                    <div className={`feed-tabs__posts ${activePostsTabClass}`} onClick={this.handlePostTabClick}>
                        {FEED_TABS.POSTS}
                        <hr className={`feed-tabs__line ${activePostsLineClass}`}/>
                    </div>
                    <div className={`feed-tabs__subscriptions ${activeSubscriptionTabClass}`} onClick={this.handleSubscriptionTabClick}>
                        {FEED_TABS.SUBSCRIPTIONS}
                        <hr className={`feed-tabs__line ${activeSubscriptionLineClass}`}/>
                    </div>
                </div>
                {cardsNodes}
            </div>
        );
    }
}

export { BlockFeedCards };

