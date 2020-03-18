import React, { Component } from 'react';
import RouteStore from 'store/routes';

import Button from 'components/fragments/button/button';

import './block-header.scss';

class BlockHeader extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const tabs = this.getHeaderTabs();
        return (
            <div className="header">
                <Button className="button__active" text="Главная" type={Button.types.link} to={RouteStore.pages.main}/>
                { tabs }
            </div>
        );
    }

    getHeaderTabs() {
        const { user } = this.props;
        if (user) {
            return (
                <>
                    <Button text="Мои посты" type={Button.types.link} to={RouteStore.pages.posts.my}/>
                    <Button text="Мои подписки" type={Button.types.link} to={RouteStore.pages.subscriptions.my}/>
                    <Button text="Подборка" type={Button.types.link} to={RouteStore.pages.podcasts.all}/>
                    <Button text={`${user.name} ${user.surname}`} type={Button.types.link} to={RouteStore.pages.user.profile}/>
                </>
            );
        } else {
            return (
                <>
                    <Button text="Войти" type={Button.types.link} to={RouteStore.pages.user.login}/>
                    <Button text="Зарегистрироваться" type={Button.types.link} to={RouteStore.pages.user.register}/>
                </>
            );
        }
    }
}

export default BlockHeader;
