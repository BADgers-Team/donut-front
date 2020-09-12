import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import BlockSearch from 'components/blocks/block-search/block-search';
import BlockCards from 'components/blocks/block-cards/block-cards';
import AjaxModule from 'services/ajax';
import RouteStore from 'store/routes';

import './layout-search.scss';

class LayoutSearch extends Component {
    state = {
        selectedActivity: 'Все',
        posts: [],
        isLoaded: false,
    }

    componentDidMount() {
        AjaxModule.get(RouteStore.api.search, [])
            .then((data) => {
                this.setState({ posts: data || [], isLoaded: true });
            })
            .catch((error) => {
                console.error(error.message);
            });
    }

    //TODO запрос на поиск пойдет туть и тут же выборки, пришли посты или кто то еще
    handleSubmitSearch = (keys) => {
        this.setState({ isLoaded: false }, () => {
            AjaxModule.get(RouteStore.api.search, keys)
                .then((data) => {
                    this.setState({ posts: data || [], isLoaded: true });
                })
                .catch((error) => {
                    console.error(error.message);
                });
        });
    };

    render() {
        const { posts, isLoaded } = this.state;
        return (
            <>
                <div className="search-container">
                    <BlockSearch onClick={this.handleSubmitSearch}/>
                    { isLoaded ? (
                        <BlockCards cards={posts}/>
                    ) : (
                        <div className="search-container__loader">
                            <Loader
                                type="Bars"
                                color="#FF6982"
                                height={120}
                                width={120}
                            />
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default LayoutSearch;
