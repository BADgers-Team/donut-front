import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';

import './block-author-card.scss';

import AvatarImage from 'assets/img/michael.jpg';
import PostsIcon from 'assets/img/posts.svg';
import { Like } from 'components/blocks/block-like/block-like';
import { Seen } from 'components/blocks/block-seen/block-seen';
import { PRIVACY } from 'store/const';

class AuthorCard extends Component {
    render() {
        const { author } = this.props;
        const login = author.login;
        const fullName = author.name;
        const profileRoute = getRouteWithID(RouteStore.pages.user.profile, login);
        const cardAvatar = author.avatar ? author.avatar : AvatarImage;      
        const postCount = author.number_of_posts || 0; 
        const activities = author.activities;

        const activitiesNodes = activities.map((activity, index) => {
            return <div key={index} className="activities-item">{activity}</div>;
        });
     
        return (
            <Link className="author-card" to={profileRoute}>
                <img className="author-card__preview" src={cardAvatar} alt="preview"/>
                <div className="author-card__info">
                    <div className="author-card__extra-info">
                        <div className="author-card__author">
                            <div className="author-card__author-login">{`@${login}`}</div>
                        </div>
                        <div className="author-card__icons">                         
                            <img className="icons-posts-icon" src={PostsIcon} />
                            <div className="icons-text">{postCount}</div>
                        </div>
                    </div>
                    <div className="author-card__name">{fullName}</div>
                    <div className="author-card__activities">
                        {activitiesNodes}
                    </div>
                </div>
            </Link>
        );
    }
}

export { AuthorCard };