import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';

import './block-post.scss';
import LikeIcon from 'assets/img/like.svg';
import DislikeIcon from 'assets/img/dislike.svg';
import EyeIcon from 'assets/img/eye.svg';

import AjaxModule from 'services/ajax';

class BlockPost extends Component {
    render() {
        const { post, login, avatar } = this.props;
        const postId = post.id;
        const date = post.date || '23 февраля 2020 в 16:09';
        const tizer = post.tizer || `Всегда незаметные вещи могут быть гораздо важнее чересчур привлекательных. 
                                     Этот пост о невероятной силе человеческого слова в описании природы`;
        const likes = post.likes_count || 0;
        const currentUserLiked = post.liked;
        const seen = post.views_count || 1;
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
                        <Like likesCount={likes} currentUserLiked={currentUserLiked} postId={postId}/>
                        <Seen seen={seen} />
                    </div>
                    <Link className="author-post__extra-more" to={postRoute}>Подробнее &gt;</Link>
                </div>
            </div>
        );
    }
}

export { BlockPost };

class Like extends Component {
    constructor(props) {
        super(props);
      
        this.state = { 
            liked: props.currentUserLiked,
            likesCount: props.likesCount,
        };
    }

    handleLikeClick = () => {     
        const id = this.props.postId;
        const route = getRouteWithID(RouteStore.api.posts.like, id);

        AjaxModule.post(route).then((data) => {
            this.setState({ liked: !this.state.liked });
            this.setState({ likesCount: data.likes_count });
        }).catch((error) => {
            console.error(error.message);
        });
    }

    render() {
        return (
            <>
                {this.state.liked && <img className="author-post__extra-statistic__icon" src={LikeIcon} alt="like" onClick={this.handleLikeClick} />}
                {!this.state.liked && <img className="author-post__extra-statistic__icon author-post__extra-disliked__icon" src={DislikeIcon} alt="dislike" onClick={this.handleLikeClick} />}
                {this.state.likesCount !== 0 && <div className="author-post__extra-statistic__text">{this.state.likesCount}</div>}
            </>
        );
    }
}

class Seen extends Component {
    constructor(props) {
        super(props);
      
    }

    render() {
        const seen = this.props.seen;

        return (
            <>      
                <img className="author-post__extra-statistic__icon" src={EyeIcon} alt="seen"/>
                <div className="author-post__extra-statistic__text">{seen}</div>            
            </>
        );
    }
}

export { Like, Seen };