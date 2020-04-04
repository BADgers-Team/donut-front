import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './block-post-static.scss';
import Avatar from 'assets/img/michael.jpg';
import ActivityIcon from 'assets/img/activity.svg';
import SubscriptionIcon from 'assets/img/subscription.svg';
import CalendarIcon from 'assets/img/calendar.svg';
import Button from 'components/fragments/button/button';
import BlockPayment from 'components/blocks/block-payment/block-payment';
import Like from 'components/blocks/block-like/block-like';
import Seen from 'components/blocks/block-seen/block-seen';
import { DonatForm } from 'components/blocks/block-post-static/donat-form/donat-form';
import { PRIVACY } from 'store/const';
import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';

class BlockPostStatic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
        };
    }

    openModal = () => {
        this.setState({ showModal: true });
    }
    
    closeModal = () => {
        this.setState({ showModal: false });
    }

    render() {
        const { post } = this.props;
        const login = post.author.login || 'cool_user';
        const profileRoute = getRouteWithID(RouteStore.pages.user.profile, login);
        const visibility = post.visible_type === 'Открыт для всех' ? 'Это публичный пост :)' : post.visible_type;
        const date = post.date || '23 февраля 2019';
        const postId = post.id;
        const likes = post.likes_count || 0;
        const currentUserLiked = post.liked;
        const seen = post.views_count || 1;
        return (
            <>
                <BlockPayment 
                isOpen={this.state.showModal}
                closeModal={this.closeModal}/>

                <div className="post-static">
                    <div className="post-static__inner">
                        <div className="post-static__title">{post.title}</div>
                        <div className="post-static__author">
                            <img className="post-static__author-avatar" src={Avatar} alt="author"/>
                            <div>
                                <div>{post.author.name}</div>
                                <Link className="post-static__author-nick" to={profileRoute}>{`@${login}`}</Link>
                            </div>
                        </div>
                        <div className="post-static__info">
                            <img className="post-static__info-icon" src={CalendarIcon} alt="calendar"/>
                            <div>{date}</div>
                        </div>
                        <div className="post-static__info">
                            <img className="post-static__info-icon" src={ActivityIcon} alt="activity"/>
                            <div>{post.activity}</div>
                        </div>
                        <div className="post-static__info">
                            <img className="post-static__info-icon" src={SubscriptionIcon} alt="subscription"/>
                            <div>{visibility}</div>
                        </div>
                        <div className="post-static__info">
                            <Like likesCount={likes} currentUserLiked={currentUserLiked} postId={postId}
                            likedClass="post-static__info__icon" 
                            dislikedClass="post-static__info__icon post-static__info-disliked__icon" 
                            textClass="post-static__info__text"/>
                            <Seen seen={seen} 
                            iconClass="post-static__info__icon" 
                            textClass="post-static__info__text"/>
                        </div>

                        {post.visible_type === PRIVACY.OPEN && (
                            <div className="post-static__controls">
                                <div className="post-static__control">
                                    <Button text="Подписаться" onAction={this.openModal} type={Button.types.link}/>
                                </div>
                                <DonatForm author={login}/>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default BlockPostStatic;
