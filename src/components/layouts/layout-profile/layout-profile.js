import React, { Component } from 'react';

import {BlockAuthor} from 'components/blocks/block-author/block-author';
import {BlockAuthorPosts} from 'components/blocks/block-author-posts/block-author-posts';
import {BlockSubscriptions} from 'components/blocks/block-subscriptions/block-subscriptions';

import AjaxModule from 'services/ajax';
import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';

import './layout-profile.scss';

class LayoutProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: null,
        };
    }

    componentDidMount() {
        const login = this.props.match.params.login;
        const route = getRouteWithID(RouteStore.api.users.login, login);
        AjaxModule.get(route).then((data) => {
            this.setState({ current: data || null });
        }).catch((error) => {
            console.error(error.message);
        });
    }

    render() {
        const { current } = this.state;
        if (current) {
            return (
                <div className="profile">
                    <BlockAuthor current={current}/>
                    <BlockAuthorPosts current={current}/>
                    <BlockSubscriptions current={current}/>
                </div>
            );
        }
        return <div className="profile">Лоадинг</div>;
    }
}

export { LayoutProfile };
