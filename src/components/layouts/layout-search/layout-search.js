import React, { Component } from 'react';

import BlockSearch from 'components/blocks/block-search/block-search';
import BlockCards from 'components/blocks/block-cards/block-cards';
import AjaxModule from "services/ajax";
import RouteStore from "store/routes";

import './layout-search.scss';

class LayoutSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedActivity: 'Все',
            posts: [],
        };
    }

    componentDidMount() {
        AjaxModule.get(RouteStore.api.search, [])
            .then((data) => {
                this.setState({ posts: data || [] });
            })
            .catch((error) => {
                console.error(error.message);
            });
    }

    //TODO запрос на поиск пойдет туть и тут же выборки, пришли посты или кто то еще
    handleSubmitSearch = (keys) => {
        console.log("KEYS", keys);
        AjaxModule.get(RouteStore.api.search, keys)
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
            <>
                <div className="search-container">
                    <BlockSearch onClick={this.handleSubmitSearch}/>
                    <BlockCards cards={posts}/>
                </div>
            </>
        );
    }
}

export default LayoutSearch;
