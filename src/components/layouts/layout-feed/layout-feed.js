import React, { Component } from 'react';

import { BlockFeedCards } from 'components/blocks/block-feed-cards/block-feed-cards';
import AjaxModule from 'services/ajax';
import RouteStore from 'store/routes';

import './layout-feed.scss';

class LayoutFeed extends Component {
    state = {
        selectedActivity: 'Все',
        data: {},
        isLoaded: false,
    }

    componentDidMount() {
        AjaxModule.get(RouteStore.api.feed, [])
            .then((data) => {
                this.setState({ data: data || {}, isLoaded: true });
            })
            .catch((error) => {
                console.error(error.message);
            });
    }

    render() {
        const { data, isLoaded } = this.state;
        const posts = data.posts ? data.posts : [];
        const subscriptions = data.subscriptions ? data.subscriptions : [];
        return (
            <>
                <div className="feed-container">
                    <BlockFeedCards posts={posts} subscriptions={subscriptions} isLoaded={isLoaded}/>
                </div>
            </>
        );
    }
}

export { LayoutFeed };
