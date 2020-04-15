import React, { Component } from 'react';

import { BlockFeedCards } from 'components/blocks/block-feed-cards/block-feed-cards';
import AjaxModule from "services/ajax";
import RouteStore from "store/routes";

import './layout-feed.scss';

class LayoutFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedActivity: 'Все',
            data: {},
        };
    }

    componentDidMount() {
        AjaxModule.get(RouteStore.api.feed, [])
            .then((data) => {
                this.setState({ data: data || {} });
            })
            .catch((error) => {
                console.error(error.message);
            });
    }

    render() {
        const { data } = this.state;
        const posts = data.posts ? data.posts : [];
        const subscriptions = data.subscriptions ? data.subscriptions : [];
        return (
            <>
                <div className="feed-container">
                    <BlockFeedCards posts={posts} subscriptions={subscriptions}/>
                </div>
            </>
        );
    }
}

export { LayoutFeed };
