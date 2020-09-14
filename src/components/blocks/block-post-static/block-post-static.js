import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AjaxModule from 'services/ajax';

import './block-post-static.scss';
import Avatar from 'assets/img/michael.png';
import ActivityIcon from 'assets/img/activity.svg';
import SubscriptionIcon from 'assets/img/subscription.svg';
import CalendarIcon from 'assets/img/calendar.svg';
import Button from 'components/fragments/button/button';
import { PaySubcriptionModal } from 'components/blocks/block-paywall/block-pay-subscription/block-pay-subscription';
import { Like } from 'components/blocks/block-like/block-like';
import { Seen } from 'components/blocks/block-seen/block-seen';
import { DonationsSum } from 'components/blocks/block-donations-sum/block-donations-sum';
import { DonatForm } from 'components/blocks/block-post-static/donat-form/donat-form';
import { PRIVACY } from 'store/const';
import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';
import { inject } from 'mobx-react';
import { Redirect } from "react-router-dom";


@inject('user')
class BlockPostStatic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            showSubcriptionPay: false,
            redirect: false,
        };
    }

    openModal = () => {
        this.setState({ showModal: true });
    }
    
    closeModal = () => {
        this.setState({ showModal: false });
    }

    handleSuccessChange = (data) => {
        this.closeModal();

        this.setState({ posts: data });
    };

    openSubcriptionPayModal = () => {
        const { user } = this.props;

        if (!user.login) {
            this.setState({ redirect: true });
            return
        }

        this.setState({ showSubcriptionPay: true });
    }

    handleFreeSubscription = () => {
        const { user, post } = this.props;

        if (!user.login) {
            this.setState({ redirect: true });
            return
        }

        const reqBody = {
            payment_type: 'Подписка',
            post_id: post.id,
            subscription_id: post.subscription_id,
        };

        AjaxModule.doAxioPost(RouteStore.api.payment.pay, reqBody)
        .then(() => {
            window.location.reload();
        }).catch((error) => {
            console.error(error.message);
        });
    }
    
    closeSubcriptionPayModal = () => {
        this.setState({ showSubcriptionPay: false });
    }

    handleSuccessChangeSubcription = (data) => {
        this.closeSubcriptionPayModal();

        this.setState({post: data}, () => {
            const { onChange } = this.props;
            onChange && onChange(this.state.post);
        });
    }


    render() {
        const { redirect } = this.state;
        const { post, user } = this.props;
        const login = post.author.login || 'cool_user';
        const profileRoute = getRouteWithID(RouteStore.pages.user.profile, login);
        const visibility = post.subscription ? post.subscription : 'Без подписки';
        const date = new Date(post.created_at).toLocaleDateString('en-US') || '23/02/2020';
        const postId = post.id;
        const likes = post.likes_count || 0;
        const currentUserLiked = post.liked;
        const seen = post.views_count || 1;
        const donationsSum = post.donated_sum || 0;
        const price = post.sum ? `${post.sum} ₽` : 'Бесплатно';
        const avatar = post.author.avatar || Avatar;

        if (redirect) {
            return <Redirect to={RouteStore.pages.user.login} />
        }
        return (
            <>
                {this.state.showSubcriptionPay && <PaySubcriptionModal   
                postId={post.id}
                subscriptionId={post.subscription_id}
                title={post.subscription}   
                priceText={price}   
                price={post.sum}                     
                onClose={this.closeSubcriptionPayModal} onSuccess={this.handleSuccessChangeSubcription}/>}

                <div className="post-static">
                    <div className="post-static__inner">
                        <div className="post-static__title">{post.title}</div>
                        <div className="post-static__author">
                            <img className="post-static__author-avatar" src={avatar} alt="author"/>
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
                            <DonationsSum sum={donationsSum} 
                            iconClass="post-static__info__icon" 
                            textClass="post-static__info__text"/>
                        </div>

                        {(post.visible_type === PRIVACY.OPEN || post.visible_type === PRIVACY.SUBSCRIPTION || post.paid || post.follows || user?.login === post.author.login) && (
                            <div className="post-static__controls">
                                {(!post.follows && post.visible_type !== PRIVACY.PRICE && post.subscription && user?.login !== post.author.login) && (
                                    <div className="post-static__control" onClick={this.handleFreeSubscription}>
                                        <Button text="Подписаться" type={Button.types.link}/>
                                    </div>
                                )}
                                { user?.login !== post.author.login && (
                                    <DonatForm author={login} current={post}/>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default BlockPostStatic;
