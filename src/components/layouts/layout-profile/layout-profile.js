import React, { Component } from 'react';

import BlockPostStatic from 'components/blocks/block-post-static/block-post-static';
import BlockPostDynamic from 'components/blocks/block-post-dynamic/block-post-dynamic';
import { BlockPaywall } from 'components/blocks/block-paywall/block-paywall';
import AjaxModule from 'services/ajax';
import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';
import { PRIVACY } from 'store/const';

import './layout-profile.scss';
import {BlockAuthor} from 'components/blocks/block-author/block-author';
import {BlockAuthorPosts} from 'components/blocks/block-author-posts/block-author-posts';
import {BlockSubscriptions} from 'components/blocks/block-subscriptions/block-subscriptions';

class LayoutProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    componentDidMount() {
        const login = this.props.match.params.login;
        const route = getRouteWithID(RouteStore.api.users.login, login);
        AjaxModule.get(route).then((data) => {
            this.setState({ user: data || null });
        }).catch((error) => {
            console.error(error.message);
        });
    }

    render() {
        const { current } = this.props;
        const { user } = this.state;
        if (user) {
            return (
                <div className="profile">
                    <BlockAuthor user={user}/>
                    <BlockAuthorPosts user={user}/>
                    <BlockSubscriptions user={user} current={current}/>
                </div>
            );
        }
        return <div className="profile">Лоадинг</div>;
    }
}

export { LayoutProfile };
