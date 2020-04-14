import React, { Component } from 'react';

import BlockActivities from 'components/blocks/block-activities/block-activities';
import BlockCards from 'components/blocks/block-cards/block-cards';
import { AjaxModule } from 'services/ajax';
import { RouteStore } from 'store/routes';

class LayoutIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedActivity: 'Все',
            posts: null,
            user: null,
        };
    }

    componentDidMount() {
        //TODO for debug
        AjaxModule.get(RouteStore.api.search).then((data) => {
            this.setState({ posts: data || [] });
        }).catch((error) => {
            console.error(error.message);
        });

        AjaxModule.get(RouteStore.api.me).then((data) => {
            this.setState({ user: data });
        });
    }

    handleChangeActivity = (key) => {
        AjaxModule.get(RouteStore.api.posts.all, {activities: key})
            .then((data) => {
                this.setState({ posts: data || [] });
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    render() {
        const { posts, user } = this.state;
        return (
            <>
                <BlockActivities onChange={this.handleChangeActivity}/>
                <BlockCards cards={posts} current={user}/>
            </>
        );
    }
}

export { LayoutIndex };
