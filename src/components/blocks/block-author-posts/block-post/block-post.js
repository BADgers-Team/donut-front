import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';

import './block-post.scss';
import LikeIcon from 'assets/img/like.svg';
import EyeIcon from 'assets/img/eye.svg';

class BlockPost extends Component {
    render() {
        const { post, login, avatar } = this.props;
        const date = post.date || '23 февраля 2020 в 16:09';
        const tizer = post.tizer || `Всегда незаметные вещи могут быть гораздо важнее чересчур привлекательных. 
                                     Этот пост о невероятной силе человеческого слова в описании природы`;
        const likes = post.likes || 234;
        const seen = post.seen || 1222;
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
                <div className="author-post__tizer">{tizer}</div>
                <div className="author-post__extra">
                    <div className="author-post__extra-statistic">
                        <img className="author-post__extra-statistic__icon" src={LikeIcon} alt="like"/>
                        <div className="author-post__extra-statistic__text">{likes}</div>
                        <img className="author-post__extra-statistic__icon" src={EyeIcon} alt="seen"/>
                        <div className="author-post__extra-statistic__text">{seen}</div>
                    </div>
                    <Link className="author-post__extra-more" to={postRoute}>Подробнее &gt;</Link>
                </div>
            </div>
        );
    }
}

export { BlockPost };
