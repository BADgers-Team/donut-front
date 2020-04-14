import React, { Component } from 'react';

import './block-subscriptions.scss';
import { BlockSubscription } from 'components/blocks/block-subscriptions/block-subscription/block-subscription';
import Button from 'components/fragments/button/button';
import RouteStore from 'store/routes';

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
        const subscriptions = user.subscriptions;
        const { showAll } = this.state;
        const subscriptionsNodes = subscriptions && showAll ? (
            subscriptions.map((subscription) => {
                return <BlockSubscription key={subscription.id} subscription={subscription}/>;
            })) : subscriptions ? <BlockSubscription subscription={subscriptions[0]}/> : null;

        // TODO: сделать plural на кол-во подписок

        return (
            <div className="author-subscriptions">
                <div className="author-subscriptions__title">Подписки</div>
                {user.login === current?.login && (
                    <Button
                        className="author-subscriptions__add"
                        text="Добавить подписку"
                        type={Button.types.link}
                        to={RouteStore.pages.subscriptions.new}
                    />)}
                <div className="author-subscriptions__body">
                    {subscriptionsNodes ? subscriptionsNodes : (
                        <div>Автор пока не добавил подписок</div>
                    )}
                </div>
                {(!showAll && subscriptionsNodes) && (
                    <Button
                        className="author-subscriptions__show"
                        text={`Показать все ${subscriptions?.length || 0} подписок`}
                        type={Button.types.block}
                        onAction={this.handleClickShowAll}
                    />
                )}
            </div>
        );
    }
}

export { BlockSubscriptions };
