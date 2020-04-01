import React, { Component } from 'react';
import { BlockPost } from 'components/blocks/block-author-posts/block-post/block-post';

import './block-author-posts.scss';
import Avatar from 'assets/img/michael.jpg';

class BlockAuthorPosts extends Component {
    render() {
        const { user } = this.props;
        const postsNodes = user.posts && user.posts.length !== 0 ? user.posts.map((post) => {
            return <BlockPost key={post.id} post={post} login={user.login} avatar={user.avatar || Avatar}/>;
        }) : null;

        return (
            <div className="author-posts">
                <div className="author-posts__title">Публикации</div>
                <div className="author-posts__body">
                    {postsNodes}
                </div>
            </div>
        );
    }
}

export { BlockAuthorPosts };
