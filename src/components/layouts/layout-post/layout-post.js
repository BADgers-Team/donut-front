import React, { Component } from 'react';

import BlockPostStatic from 'components/blocks/block-post-static/block-post-static';
import BlockPostDynamic from 'components/blocks/block-post-dynamic/block-post-dynamic';
import { BlockPaywall } from 'components/blocks/block-paywall/block-paywall';
import AjaxModule from 'services/ajax';
import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';
import { PRIVACY } from 'store/const';
import { inject } from 'mobx-react';

import './layout-post.scss';

@inject('user', 'post')
class LayoutPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: null,
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const { post } = this.props;

        const route = getRouteWithID(RouteStore.api.posts.id, id);
        AjaxModule.get(route).then((data) => {
            post.update(data);
            this.setState({ post: data || null });
        }).catch((error) => {
            console.error(error.message);
        });
    }

    getNewPost = (data) => {
        this.setState({ post: data });
    };

    render() {
        const { post } = this.state;
        const { user } = this.props;

        const content = post ? (
            <>
                <BlockPostStatic post={post} current={user}  onChange={this.getNewPost}/>
                <BlockPostDynamic post={post} current={user} />
                {post.visible_type !== PRIVACY.OPEN && !post.paid && !post.follows && user?.login !== post.author.login && <BlockPaywall post={post} onChange={this.getNewPost}/>}
            </>
        ) : <div>Пост не найден</div>;

        return (
            <div className="post">
                {content}
            </div>
        );
    }
}

export default LayoutPost;
