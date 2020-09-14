import React, { Component } from 'react';

import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';
import { inject } from 'mobx-react';

import './block-like.scss';
import LikeIcon from 'assets/img/like.svg';
import DislikeIcon from 'assets/img/dislike.svg';

import AjaxModule from 'services/ajax';

@inject('user')
class Like extends Component {
    constructor(props) {
        super(props);
      
        this.state = { 
            liked: props.currentUserLiked,
            likesCount: props.likesCount,
        };
    }

    handleLikeClick = (event) => {     
        event.preventDefault();
        
        const { postId, user } = this.props;

        if (!user.login) {
            return;
        }

        const route = getRouteWithID(RouteStore.api.posts.like, postId);

        AjaxModule.post(route).then((data) => {
            this.setState({ liked: data.liked });
            this.setState({ likesCount: data.likes_count });
        }).catch((error) => {
            console.error(error.message);
        });
    }

    render() {
        const { likedClass, dislikedClass, textClass} = this.props;
        return (
            <>
                {this.state.liked && <img className={likedClass} src={LikeIcon} alt="like" onClick={this.handleLikeClick} />}
                {!this.state.liked && <img className={dislikedClass} src={DislikeIcon} alt="dislike" onClick={this.handleLikeClick} />}
                <div className={textClass + `${this.state.likesCount !== 0 ? '' : ' hidden-text'}`}>{this.state.likesCount}</div>
            </>
        );
    }
}

export { Like };