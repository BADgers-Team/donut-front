import React, { Component } from 'react';
import { BlockPost } from 'components/blocks/block-author-posts/block-post/block-post';
import Select from 'components/fragments/select/select';
import { PRIVACY } from 'store/const';
import RouteStore from 'store/routes';
import AjaxModule from 'services/ajax';

import './block-author-posts.scss';
import Avatar from 'assets/img/michael.jpg';

class BlockAuthorPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
        const { current } = this.props;
        this.setState({ posts: current.posts ? current.posts : [] });
    }

    handleSelectChange = (event) => {
        const { current } = this.props;
        const selectedPrivacy = event.target[event.target.selectedIndex].value;
        AjaxModule.get(RouteStore.api.search, {
            login: current.login,
            visible_type: selectedPrivacy,
            data_type: 'posts'
        }).then((data) => {
            this.setState({ posts: data.posts });
        }).catch((error) => {
            console.error(error.message);
        });
    };

    render() {
        const { current } = this.props;
        const { posts } = this.state;
        const postsNodes = posts && posts.length !== 0 ? posts.map((post) => {
            return <BlockPost key={post.id} post={post} login={current.login} avatar={current.avatar || Avatar}/>;
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
                    classValue='author-posts__selector'
                />
                <div className="author-posts__body">
                    {postsNodes ? postsNodes : <div>Посты не найдены</div>}
                </div>
            </div>
        );
    }
}

export { BlockAuthorPosts };
