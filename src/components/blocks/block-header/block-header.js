import React, { Component } from 'react';
import RouteStore from 'store/routes';

import Button from 'components/fragments/button/button';
import './block-header.scss';
import LogoImage from 'assets/img/logo.png';
import SearchIcon from 'assets/img/search.svg';
import AuthorAvatar from 'assets/img/michael.jpg';
import ExitIcon from 'assets/img/exit.svg';
import {getRouteWithID} from 'services/getRouteWithId';

class BlockHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 'Главная',
        };
    }

    handleChangeTab = (tab) => {
        this.setState({
            activeTab: tab,
        });
    };

    render() {
        const tabs = this.getHeaderTabs();
        const { activeTab } = this.state;
        const baseClass = 'header-button';
        const activeClass = 'header-button__active';
        const mainClasses = activeTab === 'Главная' ? `${baseClass} ${activeClass}` : baseClass;

        return (
            <div className="header">
                <div className="header-button">
                    <img className="logo" src={LogoImage} alt="logo"/>
                </div>
                <div className={mainClasses}>
                    <Button text="Главная" type={Button.types.link} to={RouteStore.pages.main} onAction={this.handleChangeTab}/>
                </div>
                {tabs}
            </div>
        );
    }

    getHeaderTabs() {
        const {user} = this.props;
        const { activeTab } = this.state;
        const baseClass = 'header-button';
        const activeClass = 'header-button__active';
        const myPosts = activeTab === 'Мои посты' ? `${baseClass} ${activeClass}` : baseClass;
        const mySubscriptions = activeTab === 'Мои подписки' ? `${baseClass} ${activeClass}` : baseClass;
        const podcast = activeTab === 'Подборки' ? `${baseClass} ${activeClass}` : baseClass;
        const createPost = activeTab === 'Создать пост' ? `${baseClass} ${activeClass}` : baseClass;
        const search = activeTab === 'Поиск' ? `${baseClass} ${activeClass}` : baseClass;
        if (user) {
            const profile = activeTab === `${user.name} ${user.surname}` ? `${baseClass} ${activeClass}` : baseClass;
            return (
                <>
                    <div className={myPosts}>
                        <Button text="Мои посты" type={Button.types.block}/>
                    </div>
                    <div className={mySubscriptions}>
                        <Button text="Мои подписки" type={Button.types.block}/>
                    </div>
                    <div className={podcast}>
                        <Button text="Подборки" type={Button.types.block}/>
                    </div>
                    <div className={search}>
                        <Button text="Поиск" type={Button.types.link} to={RouteStore.pages.search} onAction={this.handleChangeTab}/>         
                    </div>
                    <div className={`${createPost} header-button__main`}>
                        <Button text="Создать пост" type={Button.types.link} to={RouteStore.pages.posts.new} onAction={this.handleChangeTab}/>
                    </div>
                    <div className={profile}>
                        <Button
                            text={`${user.name}`}
                            type={Button.types.link}
                            to={`/users/${user.login}`}
                            onAction={this.handleChangeTab}
                        />
                        <img className="user" src={AuthorAvatar} alt="user"/>
                    </div>
                    <div className="header-button">
                        <a className="exit" src={ExitIcon} alt="exit"/>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className={search}>
                        <Button text="Поиск" type={Button.types.link} to={RouteStore.pages.search} onAction={this.handleChangeTab}/>         
                    </div>
                    <Button text="Войти" type={Button.types.link} to={RouteStore.pages.user.login}/>
                    <Button text="Зарегистрироваться" type={Button.types.link} to={RouteStore.pages.user.register}/>
                </>
            );
        }
    }
}

export default BlockHeader;
