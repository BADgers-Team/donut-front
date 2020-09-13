import React, { Component } from 'react';

import './block-subscriptions.scss';
import { SubscriptionCard } from 'components/blocks/block-cards/block-subscription-card/block-subscription-card';

import Button from 'components/fragments/button/button';
import RouteStore from 'store/routes';
import { inject } from 'mobx-react';

@inject('user')
class BlockSubscriptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showAll : false,
        };
    }

    handleClickShowAll = () => {
        this.setState({ showAll: true});
    };

    render() {
        const { user, current } = this.props;
        const subscriptions = current.subscriptions;
        const { showAll } = this.state;
        const subscriptionsNodes = subscriptions && showAll ? (
            subscriptions.map((subscription) => {
                return <SubscriptionCard key={subscription.id} current={user} subscription={subscription} type={SubscriptionCard.types.profile}/>;
            })) : subscriptions ? <SubscriptionCard current={user} subscription={subscriptions[0]} type={SubscriptionCard.types.profile}/> : null;

        // TODO: сделать plural на кол-во подписок

        return (
            <div className="author-subscriptions">
                <div className="author-subscriptions__title">Каналы</div>
                {user.login === current?.login && (
                    <Button
                        className="author-subscriptions__add"
                        text="Добавить канал"
                        type={Button.types.link}
                        to={RouteStore.pages.subscriptions.new}
                    />)}
                <div className="author-subscriptions__body">
                    {subscriptionsNodes ? subscriptionsNodes : (
                        <div>Автор пока не добавил каналов</div>
                    )}
                </div>
                {(!showAll && subscriptions?.length > 1) && (
                    <Button
                        className="author-subscriptions__show"
                        text={`Показать все ${subscriptions?.length || 0} каналов`}
                        type={Button.types.block}
                        onAction={this.handleClickShowAll}
                    />
                )}
            </div>
        );
    }
}

export { BlockSubscriptions };
