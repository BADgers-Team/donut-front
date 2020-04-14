import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { RouteStore } from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';

import './block-post-card.scss';

import CardImage from 'assets/img/card-image.jpg';
import LockIcon from 'assets/img/lock.svg';
import { Like } from 'components/blocks/block-like/block-like';
import { Seen } from 'components/blocks/block-seen/block-seen';
import { PRIVACY } from 'store/const';

const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

class PostCard extends Component {
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
        const { card, current } = this.props;
        const postId = card.id;
        const login = card.author.login;
        const profileRoute = getRouteWithID(RouteStore.pages.user.profile, login);
        const cardRoute = getRouteWithID(RouteStore.api.posts.id, card.id);  
        const cardDate = this.formatDate(card.created_at);
        const cardPreview = card.files ? card.files[0] : CardImage;      
        const likes = card.likes_count || 0;
        const currentUserLiked = card.liked;
        const seen = card.views_count || 1;
        const cardTitle = card.title;
        const cardContent = card.teaser ? card.teaser : card.description;

        const isAvailable = card.visible_type === PRIVACY.OPEN || card.paid || card.follows || current?.login === card.author.login;
        
        return (
            <Link className="post-card" to={cardRoute}>
                <div className="post-card__header">
                    <div className="post-card__date">{cardDate}</div>
                    {!isAvailable && (
                        <div className="post-card__access">
                            <img className="post-card__access-lock" src={LockIcon} alt="preview"/>
                        </div>
                    )}
                </div>
                <img className="post-card__preview" src={cardPreview} alt="preview"/>
                <div className="post-card__info">
                    <div className="post-card__extra-info">
                        <div className="post-card__author">
                            <div className="post-card__author-login">{`@${login}`}</div>
                        </div>
                        <div className="post-card__icons">                         
                            <Like likesCount={likes} currentUserLiked={currentUserLiked} postId={postId}
                            likedClass="icons__likes-liked" 
                            dislikedClass="icons__likes-disliked" 
                            textClass="icons__likes-text icons-text"/>
                            <Seen seen={seen} 
                            iconClass="icons__views-icon" 
                            textClass="icons__views-text icons-text"/>
                        </div>
                    </div>
                    <div className="post-card__title">{cardTitle}</div>
                    <div className="post-card__content">
                        <span>{cardContent}</span>
                    </div>
                </div>
            </Link>
        );
    }
}

export { PostCard };