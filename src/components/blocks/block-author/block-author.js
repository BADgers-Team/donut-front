import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { BlockGoals } from 'components/blocks/block-author/block-goals/block-goals';

import Avatar from 'assets/img/michael.jpg';

import './block-author.scss';

@inject('user')
class BlockAuthor extends Component {
    render() {
        const { user } = this.props;
        const subscriptions = user.number_of_subscriptions || 0;
        const posts = user.number_of_posts || 0;
        const followers = user.number_of_followers || 0;
        const description = user.description || '';
        const avatar = user.avatar || Avatar;
        // TODO: сделать plural на слова в info
        return (
            <>
                <div className="author-info">
                    <img className="author-info__avatar" src={avatar} alt="avatar"/>
                    <div className="author-info__login">{`@${user.login}`}</div>
                    <div className="author-info__name">{user.name}</div>
                    <div className="author-info__info">
                        {`${posts} постов | ${subscriptions} подписок | ${followers} подписчиков`}
                    </div>
                    <div className="author-info__description">{description}</div>
                    <BlockGoals {...this.props} />
                </div>
            </>
        );
    }
}

export { BlockAuthor };
