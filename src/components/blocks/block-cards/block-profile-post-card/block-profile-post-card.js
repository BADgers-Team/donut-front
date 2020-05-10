import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { RouteStore } from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';

import './block-profile-post-card.scss';

import AvatarMock from 'assets/img/michael.png';

import { Like } from 'components/blocks/block-like/block-like';
import { Seen } from 'components/blocks/block-seen/block-seen';
import { abbrNumber } from 'utils/functions';

const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

class ProfilePostCard extends Component {
    formatDate = (date) => {
        const d = new Date(date);
        
        const day = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();
        const hours = d.getHours();
        const minutes = d.getMinutes();

        return `${day} ${month} ${year} в ${hours}:${minutes}`
    }

    render() {
        const { post, login, avatar } = this.props;
        const postId = post.id;
        const date = this.formatDate(post.created_at);
        const teaser = post.teaser || post.description;
        const likes = abbrNumber(post.likes_count);
        const currentUserLiked = post.liked;
        const seen = abbrNumber(post.views_count);
        const postRoute = getRouteWithID(RouteStore.pages.posts.id, postId);
        return (
            <div className="profile-post-card">
                <div className="profile-post-card__header">
                    <img className="profile-post-card__header__avatar" src={avatar} alt="avatar"/>
                    <div className="profile-post-card__header__info">
                        <div className="profile-post-card__header__login">{`@${login}`}</div>
                        <div className="profile-post-card__header__created">{date}</div>
                    </div>
                </div>
                <div className="profile-post-card__title">{post.title}</div>
                <div className="profile-post-card__tizer">{teaser}</div>
                <div className="profile-post-card__extra">
                    <div className="profile-post-card__extra-statistic">
                        <Like likesCount={likes} currentUserLiked={currentUserLiked} postId={postId}
                        likedClass="profile-post-card__extra-statistic__icon" 
                        dislikedClass="profile-post-card__extra-statistic__icon profile-post-card__extra-disliked__icon" 
                        textClass="profile-post-card__extra-statistic__text"/>
                        <Seen seen={seen} 
                        iconClass="profile-post-card__extra-statistic__icon" 
                        textClass="profile-post-card__extra-statistic__text"/>
                    </div>
                    <Link className="profile-post-card__extra-more" to={postRoute}>Подробнее &gt;</Link>
                </div>
            </div>
        );
    }
}

export { ProfilePostCard };
