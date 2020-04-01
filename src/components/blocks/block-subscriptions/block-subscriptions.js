import React, { Component } from 'react';

import './block-subscriptions.scss';
import { BlockSubscription } from 'components/blocks/block-subscriptions/block-subscription/block-subscription';
import Button from 'components/fragments/button/button';

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
        const { subscriptions } = this.props.user;
        const { showAll } = this.state;
        const subscriptionsNodes = showAll ? (
            subscriptions.map((subscription) => {
                return <BlockSubscription key={subscription.id} subscription={subscription}/>;
            })) : <BlockSubscription subscription={subscriptions[0]}/>;

        // TODO: сделать plural на кол-во подписок

        return (
            <div className="author-subscriptions">
                <div className="author-subscriptions__title">Подписки</div>
                <div className="author-subscriptions__body">
                    {subscriptionsNodes}
                </div>
                {!showAll &&
                    <Button
                        className="author-subscriptions__show"
                        text={`Показать все ${subscriptions.length} подписок`}
                        type={Button.types.block}
                        onAction={this.handleClickShowAll}
                    />
                }
            </div>
        );
    }
}

export { BlockSubscriptions };
