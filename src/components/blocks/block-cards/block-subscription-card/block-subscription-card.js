import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { RouteStore } from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';

import './block-subscription-card.scss';
import Button from 'components/fragments/button/button';

import BellIcon from 'assets/img/bell.svg';
import UserIcon from 'assets/img/user.svg';
import SubscribersIcon from 'assets/img/subscribers.svg';

class SubscriptionCard extends Component {
    constructor(props) {
        super(props);
        
        this._types = SubscriptionCard.types;
    }

    static get types() {
        return {
            profile: 'profile',
            common: 'common',
        };
    }

    render() {
        const { subscription, current, type } = this.props;

        const login = subscription.user_login;
        const profileRoute = getRouteWithID(RouteStore.pages.user.profile, login);
        const sum = subscription.sum === 0 ? 'Бесплатно' : `${subscription.sum} ₽ в месяц`;
        const cardBackgroundClass = type === this._types.profile ? 'card-profile' : 'card-common';
        const subscribers = subscription.subscribers_count;

        const isAvailable = subscription.follows || current?.login === login;

        return (
            <div className={`subscription-card ${cardBackgroundClass}`}>
                <div className="subscription-card__title">{subscription.title}</div>
                <div className="subscription-card__price">{sum}</div>
                <div className="subscription-card__description">{subscription.description}</div>
                <div className="subscription-card__icons">
                    <div className="icons__user">
                        <img className="icons__user user-icon" src={UserIcon}/>
                        <Link className="icons__user user-value" to={profileRoute}>{`@${login}`}</Link>
                    </div>
                    <div className="icons__subscribers">
                        <img className="icons__subscribers subscribers-icon" src={SubscribersIcon}/>
                        <div className="icons__subscribers subscribers-value">{subscribers}</div>
                    </div>
                </div>
                {!isAvailable && (
                    <div className="subscription-card__button-container">
                        <img className="subscription-card__button-bell" src={BellIcon}/>
                        <Button className="subscription-card__button" text='Подписаться' type={Button.types.block}/>
                    </div>
                )}
            </div>
        );
    }
}

export { SubscriptionCard };
