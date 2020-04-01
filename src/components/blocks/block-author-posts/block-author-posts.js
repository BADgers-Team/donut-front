import React, { Component } from 'react';
import { BlockPost } from 'components/blocks/block-author-posts/block-post/block-post';
import Select from 'components/fragments/select/select';
import { PRIVACY } from 'store/const';

import './block-author-posts.scss';
import Avatar from 'assets/img/michael.jpg';

class BlockAuthorPosts extends Component {
    handleSelectChange = (event) => {
        const selectedPrivacy = event.target[event.target.selectedIndex].value;
        console.log(selectedPrivacy);
    };

    render() {
        const { user } = this.props;
        const postsNodes = user.posts && user.posts.length !== 0 ? user.posts.map((post) => {
            return <BlockPost key={post.id} post={post} login={user.login} avatar={user.avatar || Avatar}/>;
        }) : null;

        const patchedPrivacy = Object.assign({ ALL: ''}, PRIVACY);
        const privacySelect = Object.values(patchedPrivacy).map((privacy, index) => {
            return {
                id: index,
                value: privacy,
                text: privacy || 'Все',
            };
        });

        return (
            <div className="author-posts">
                <div className="author-posts__title">Публикации</div>
                <Select
                    name="privacy"
                    values={privacySelect}
                    actionType={Select.events.change}
                    onAction={this.handleSelectChange}
                />
                <div className="author-posts__body">
                    {postsNodes}
                </div>
            </div>
        );
    }
}

export { BlockAuthorPosts };
