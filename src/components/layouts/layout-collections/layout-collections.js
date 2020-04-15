import React, { Component } from 'react';

import BlockActivities from 'components/blocks/block-activities/block-activities';
import BlockCards from 'components/blocks/block-cards/block-cards';
import AjaxModule from 'services/ajax';
import RouteStore from 'store/routes';

import './layout-collections.scss';

class LayoutCollections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedActivity: 'Все',
            posts: [],
        };
    }

    componentDidMount() {
        AjaxModule.get(RouteStore.api.posts.all).then((data) => {
            this.setState({ posts: data || [] });
        }).catch((error) => {
            console.error(error.message);
        });
    }

    handleChangeActivity = (key) => {
        AjaxModule.get(RouteStore.api.posts.all, key !== 'Все' ? {activities: key} : null)
            .then((data) => {
                this.setState({ posts: data || [] });
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    render() {
        const { posts } = this.state;
        return (
            <div className="layout-collections">
                <BlockActivities onChange={this.handleChangeActivity}/>
                <BlockCards cards={posts}/>
            </div>
        );
    }
}

export { LayoutCollections };
