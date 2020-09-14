import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import {BlockAuthor} from 'components/blocks/block-author/block-author';
import {BlockAuthorPosts} from 'components/blocks/block-author-posts/block-author-posts';
import {BlockSubscriptions} from 'components/blocks/block-subscriptions/block-subscriptions';
import { TOAST_TYPES } from 'components/fragments/toast/toast';

import AjaxModule from 'services/ajax';
import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';

import './layout-profile.scss';

class LayoutProfile extends Component {
    state = {
        current: null,
        isLoaded: false,
    }

    fetchUser = () => {
        const {showToast} = this.props;
        const login = this.props.match.params.login;
        const route = getRouteWithID(RouteStore.api.users.login, login);

        AjaxModule.get(route).then((data) => {
            this.setState({ current: data || null, isLoaded: true });
        }).catch((error) => {
            showToast({ type: TOAST_TYPES.ERROR });
            console.error(error.message);
        });
    }

    componentDidMount() {
        this.fetchUser();
    }

    componentDidUpdate(prevProps) {
        const login = this.props.match.params.login;
        const prevLogin = prevProps.match.params.login;
        if (login !== prevLogin) {
            this.fetchUser();
        }
    }

    render() {
        const { current, isLoaded } = this.state;
        const { showToast } = this.props;

        return (
            <div className="profile">
                {isLoaded ? (
                    <>
                        <BlockAuthor current={current} showToast={showToast}/>
                        <BlockAuthorPosts current={current} showToast={showToast}/>
                        <BlockSubscriptions current={current} showToast={showToast}/>
                    </>
                ) : (
                    <div className="profile__loader">
                        <Loader
                            type="Bars"
                            color="#FF6982"
                            height={120}
                            width={120}
                        />
                    </div>
                )}
            </div>
        );
    }
}

export { LayoutProfile };
