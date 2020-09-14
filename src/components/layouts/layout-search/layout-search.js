import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import { TOAST_TYPES } from 'components/fragments/toast/toast';
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
        const {showToast} = this.props;

        AjaxModule.get(RouteStore.api.search, [])
            .then((data) => {
                this.setState({ posts: data || [], isLoaded: true });
            })
            .catch((error) => {
                showToast({ type: TOAST_TYPES.ERROR });
                console.error(error.message);
            });
    }

    //TODO запрос на поиск пойдет туть и тут же выборки, пришли посты или кто то еще
    handleSubmitSearch = (keys) => {
        const {showToast} = this.props;

        this.setState({ isLoaded: false }, () => {
            AjaxModule.get(RouteStore.api.search, keys)
                .then((data) => {
                    this.setState({ posts: data || [], isLoaded: true });
                })
                .catch((error) => {
                    showToast({ type: TOAST_TYPES.ERROR });
                    console.error(error.message);
                });
        });
    };

    render() {
        const { posts, isLoaded } = this.state;
        const { showToast } = this.props;
        return (
            <>
                <div className="search-container">
                    <BlockSearch onClick={this.handleSubmitSearch} showToast={showToast}/>
                    { isLoaded ? (
                        <BlockCards cards={posts} showToast={showToast}/>
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
