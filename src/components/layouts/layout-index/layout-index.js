import React, { Component } from 'react';

import BlockActivities from 'components/blocks/block-activities/block-activities';
import BlockSearch from 'components/blocks/block-search/block-search';
import BlockCards from 'components/blocks/block-cards/block-cards';
import AjaxModule from "services/ajax";
import RouteStore from "store/routes";

class LayoutIndex extends Component {
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
        AjaxModule.get(RouteStore.api.posts.all, {activities: key})
            .then((data) => {
                this.setState({ posts: data || [] });
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    //TODO запрос на поиск пойдет туть и тут же выборки, пришли посты или кто то еще
    handleSubmitSearch = (keys) => {
        AjaxModule.get(RouteStore.api.search, keys)
            .then((data) => {
                console.log(data);
                this.setState({ posts: data.posts || [] });
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    render() {
        const { posts } = this.state;
        return (
            <>
                {/* <BlockActivities onChange={this.handleChangeActivity}/> */}
                <BlockSearch onSubmit={this.handleSubmitSearch}/>
                <BlockCards cards={posts}/>
            </>
        );
    }
}

export default LayoutIndex;
