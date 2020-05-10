import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';
import { abbrNumber } from 'utils/functions';

import './block-post.scss';

import { Like } from 'components/blocks/block-like/block-like';
import { Seen } from 'components/blocks/block-seen/block-seen';

class BlockPost extends Component {
    render() {
        const { post, login, avatar } = this.props;
        const postId = post.id;
        const date = new Date(post.created_at).toLocaleDateString('en-US') || '23/02/2020';
        const teaser = post.teaser || post.description;
        const likes = abbrNumber(post.likes_count);
        const currentUserLiked = post.liked;
        const seen = abbrNumber(post.views_count);
        const postRoute = getRouteWithID(RouteStore.pages.posts.id, post.id);
        return (
            <div className="author-post">
                <div className="author-post__header">
                    <img className="author-post__header__avatar" src={avatar} alt="avatar"/>
                    <div className="author-post__header__info">
                        <div className="author-post__header__login">{`@${login}`}</div>
                        <div className="author-post__header__created">{date}</div>
                    </div>
                </div>
                <div className="author-post__title">{post.title}</div>
                <div className="author-post__tizer">{teaser}</div>
                <div className="author-post__extra">
                    <div className="author-post__extra-statistic">
                        <Like likesCount={likes} currentUserLiked={currentUserLiked} postId={postId}
                        likedClass="author-post__extra-statistic__icon" 
                        dislikedClass="author-post__extra-statistic__icon author-post__extra-disliked__icon" 
                        textClass="author-post__extra-statistic__text"/>
                        <Seen seen={seen} 
                        iconClass="author-post__extra-statistic__icon" 
                        textClass="author-post__extra-statistic__text"/>
                    </div>
                    <Link className="author-post__extra-more" to={postRoute}>Подробнее &gt;</Link>
                </div>
            </div>
        );
    }
}

export { BlockPost };
