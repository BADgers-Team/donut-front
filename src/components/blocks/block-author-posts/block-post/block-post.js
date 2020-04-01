import React, { Component } from 'react';

import './block-post.scss';

class BlockPost extends Component {
    render() {
        const { post, login, avatar } = this.props;
        const date = post.date || '23 февраля 2020 в 16:09';
        const tizer = post.tizer || `Всегда незаметные вещи могут быть гораздо важнее чересчур привлекательных. 
                                     Этот пост о невероятной силе человеческого слова в описании природы`;
        return (
            <div className="author-post">
                <div className="author-post__header">
                    <img className="author-post__header__avatar" src={avatar} alt="avatar"/>
                    <div className="author-post__header__login">{`@${login}`}</div>
                    <div className="author-post__header__created">{date}</div>
                </div>
                <div className="author-post__title">{post.title}</div>
                <div className="author-post__tizer">{tizer}</div>
            </div>
        );
    }
}

export { BlockPost };
