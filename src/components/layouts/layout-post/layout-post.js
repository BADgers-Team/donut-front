import React, { Component } from 'react';

import BlockPostStatic from 'components/blocks/block-post-static/block-post-static';
import BlockPostDynamic from 'components/blocks/block-post-dynamic/block-post-dynamic';
import { BlockPaywall } from 'components/blocks/block-paywall/block-paywall';
import AjaxModule from 'services/ajax';
import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';
import { PRIVACY } from 'store/const';

import './layout-post.scss';

class LayoutPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const route = getRouteWithID(RouteStore.api.posts.id, id);
        AjaxModule.get(route).then((data) => {
            this.setState({ post: data || null });
        }).catch((error) => {
            console.error(error.message);
        });
    }

    render() {
        const { post } = this.state;
        const content = post ? (
            <>
                <BlockPostStatic post={post}/>
                <BlockPostDynamic post={post}/>
                {post.visible_type !== PRIVACY.OPEN && <BlockPaywall post={post}/>}
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
