import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';

import './block-post-card.scss';

//import CardImage from 'assets/img/card-image.png';
import CardApplication from 'assets/img/card-application.png';
import CardDefault from 'assets/img/card-default.png';
import CardVideo from 'assets/img/card-video.png';
import CardMusic from 'assets/img/card-music.png';

import LockIcon from 'assets/img/lock.svg';
import { Like } from 'components/blocks/block-like/block-like';
import { Seen } from 'components/blocks/block-seen/block-seen';
import { PRIVACY } from 'store/const';
import { abbrNumber } from 'utils/functions';

const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

const trim = (str, length) => {
    if (str.length <= length) {
        return str;
    }

    const sliced = str.slice(0, length - 3);
    const slicedArr = sliced.split(' ');
    const result = slicedArr.slice(0, -1).join(' ');

    return `${result}...`;
};

class PostCard extends Component {
    formatDate = (date) => {
        const d = new Date(date);

        const day = String(d.getDate()).padStart(2, '0');
        const month = months[d.getMonth()];
        const year = d.getFullYear();
        const hours = String(d.getHours()).padStart(2, '0');
        const minutes = String(d.getMinutes()).padStart(2, '0');

        return `${day} ${month} ${year} в ${hours}:${minutes}`;
    };

    getPreview = (card) => {
        let cardPreview; 

        const firstImage = card.full_files?.find(v => v.mimetype.split('/')[0] === 'image');
        if (!firstImage) {
            if (!card.full_files) {
                if (card.raw === '') {
                    return CardDefault;
                }
                const raw = JSON.parse(card.raw);
                const embedded = Object.values(raw.entityMap).find(file => file.type === "EMBEDDED_LINK");
                if (!embedded) {
                    cardPreview = CardDefault;
                } else {
                    cardPreview = CardVideo;
                }
                return cardPreview;
            }
            switch (card.full_files[0].mimetype.split('/')[0]) {
                case 'application':
                    cardPreview = CardApplication;
                    break;
                case 'audio':
                    cardPreview = CardMusic;
                    break;
                default:
                    cardPreview = CardDefault;
            } 
        } else {
            //потому что .heic на превью не отображается как пикча
            if (firstImage.mimetype === 'image/heic') {
                return CardDefault;
            }
            cardPreview = firstImage.link;
        }  

        return cardPreview;
    };

    render() {
        const { card, current } = this.props;
        const postId = card.id;
        const login = card.author.login;
        // const profileRoute = getRouteWithID(RouteStore.pages.user.profile, login);
        const cardRoute = getRouteWithID(RouteStore.api.posts.id, card.id);  
        const cardDate = this.formatDate(card.created_at);   
        const cardPreview = this.getPreview(card);  
        const likes = abbrNumber(card.likes_count);
        const currentUserLiked = card.liked;
        const seen = abbrNumber(card.views_count);
        const cardTitle = card.title;
        const cardContent = card.teaser ? card.teaser : card.description;

        const isAvailable = card.visible_type === PRIVACY.OPEN || card.paid || card.follows || current?.login === card.author.login;

        return (
            <Link className="post-card" to={cardRoute}>
                <div className="post-card__preview" style={{
                    backgroundImage: `url('${cardPreview}')`
                }}/>
                <div className="post-card__dimmer"/>
                <div className="post-card__container">
                    <div className="post-card__header">
                        <div className="post-card__date">{cardDate}</div>
                        {!isAvailable && (
                            <div className="post-card__access">
                                <img className="post-card__access-lock" src={LockIcon} alt="preview"/>
                            </div>
                        )}
                    </div>
                    <div className="post-card__content-container">
                        <div className="post-card__title">
                            {cardTitle}
                        </div>
                        <div className="post-card__content">
                            {/* Длина подобрана эмпирически */}
                            {trim(cardContent, 140)}
                        </div>
                    </div>
                    <div className="post-card__info">
                        <div className="post-card__extra-info">
                            <div className="post-card__author">
                                <div className="post-card__author-login">{`@${login}`}</div>
                            </div>
                            <div className="post-card__icons">
                                <Like
                                    likesCount={likes} currentUserLiked={currentUserLiked} postId={postId}
                                    likedClass="icons__likes-liked"
                                    dislikedClass="icons__likes-disliked"
                                    textClass="icons__likes-text icons-text"/>
                                <Seen
                                    seen={seen}
                                    iconClass="icons__views-icon"
                                    textClass="icons__views-text icons-text"/>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

export { PostCard };