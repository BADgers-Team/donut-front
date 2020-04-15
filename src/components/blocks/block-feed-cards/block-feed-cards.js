import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getRouteWithID } from 'services/getRouteWithId';
import RouteStore from 'store/routes';

import './block-feed-cards.scss';

import { PostCard } from 'components/blocks/block-cards/block-post-card/block-post-card';
import { SubscriptionCard } from 'components/blocks/block-cards/block-subscription-card/block-subscription-card';
import { inject } from 'mobx-react';

export const FEED_TABS = {
    'POSTS': 'Мои посты',
    'SUBSCRIPTIONS': 'Мои подписки',
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
    }

    handleSubscriptionTabClick = () => {
        this.setState({ selectedTab: FEED_TABS.SUBSCRIPTIONS});
    }

    render() {
        const { posts, subscriptions, user } = this.props;
        const { selectedTab } = this.state;
      
        //TODO проверить на пустые данные
        const postCards = posts ? posts : [];
        let postСardsNodes;
        if (postCards) {
            postСardsNodes = postCards.map((card, index) => {
                return <PostCard key={index} card={card} current={user}/>;
            });
        }

        const subscriptionCards = subscriptions ? subscriptions : [];
        let subscriptionСardsNodes;
        if (subscriptionCards) {
            subscriptionСardsNodes = subscriptionCards.map((card, index) => {
                return <SubscriptionCard key={index} subscription={card} current={user}/>;
            });
        }

        let cardsNodes;
        switch (selectedTab) {
            case FEED_TABS.POSTS:
                cardsNodes = (
                    <>
                        {postCards && <div className="cards__items cards-posts"> 
                            <div className="cards__content">
                                {postСardsNodes}
                            </div>
                        </div>}
                    </>
                );
                break;
            case FEED_TABS.SUBSCRIPTIONS:
                cardsNodes = (
                    <>
                        {subscriptionCards && <div className="cards__items cards-posts"> 
                            <div className="cards__content">
                                {subscriptionСardsNodes}
                            </div>
                        </div>}
                    </>
                );
                break;
        }

        const activePostsTabClass = selectedTab === FEED_TABS.POSTS ? 'active-tab' : '';
        const activeSubscriptionTabClass = selectedTab === FEED_TABS.SUBSCRIPTIONS ? 'active-tab' : '';
        
        const activePostsLineClass = selectedTab === FEED_TABS.POSTS ? 'active-line' : '';
        const activeSubscriptionLineClass = selectedTab === FEED_TABS.SUBSCRIPTIONS ? 'active-line' : '';
        
        //TODO: сделать экран Данные не найдены
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

