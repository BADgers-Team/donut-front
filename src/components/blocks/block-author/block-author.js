import React, { Component } from 'react';
import { BlockGoals } from 'components/blocks/block-author/block-goals/block-goals';

import Avatar from 'assets/img/michael.jpg';

import './block-author.scss';

class BlockAuthor extends Component {
    render() {
        const { user } = this.props;
        const subscriptions = user.number_of_subscriptions;
        const posts = user.number_of_posts;
        const followers = user.followers || 0;
        const description = user.description || `Начал рисовать Россию в 4 года. Сначала было некрасиво, 
                                                потом стало годно. Потом увлёкся футболом, а потом начал любить хоккей и музыку. 
                                                Играю на губной гармошке, но в консерваторию меня не берут. Это меня с каждым 
                                                днём расстраивало всё больше, поэтому я пришёл сюда и делюсь этим с вами. Русские вперёд!`;
        // TODO: сделать plural на слова в info
        return (
            <>
                <div className="author-info">
                    <img className="author-info__avatar" src={Avatar} alt="avatar"/>
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
