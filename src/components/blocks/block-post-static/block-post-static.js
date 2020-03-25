import React, { Component } from 'react';

import './block-post-static.scss';
import Avatar from 'assets/img/michael.jpg';
import ActivityIcon from 'assets/img/activity.svg';
import SubscriptionIcon from 'assets/img/subscription.svg';
import Button from 'components/fragments/button/button';
import RouteStore from 'store/routes';

class BlockPostStatic extends Component {
    render() {
        const { post } = this.props;
        const login = '@cool_user';
        const visibility = post.visible_type === 'Открыт для всех' ? 'Это публичный пост :)' : post.visible_type;
        return (
            <div className="post-static">
                <div className="post-static__title">{post.title}</div>
                <div className="post-static__author">
                    <img className="post-static__author-avatar" src={Avatar} alt="author"/>
                    <div>
                        <div>{post.author.name}</div>
                        <div className="post-static__author-nick">{post.author.login || login}</div>
                    </div>
                </div>
                <div className="post-static__info">
                    <img className="post-static__info-icon" src={ActivityIcon} alt="activity"/>
                    <div>{post.activity}</div>
                </div>
                <div className="post-static__info">
                    <img className="post-static__info-icon" src={SubscriptionIcon} alt="subscription"/>
                    <div>{visibility}</div>
                </div>
                <div className="post-static__controls">
                    <div className="post-static__control">
                        <Button text="Подарить пончик" type={Button.types.block}/>
                    </div>
                    <div className="post-static__control">
                        <Button text="Подписаться" type={Button.types.link} to={RouteStore.pages.user}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlockPostStatic;
