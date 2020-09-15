import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import RouteStore from 'store/routes';
import AjaxModule from 'services/ajax';

import Button from 'components/fragments/button/button';
import LogoImage from 'assets/img/logo.png';
import AuthorAvatar from 'assets/img/michael.png';
import ExitIcon from 'assets/img/exit.svg';
import './block-header.scss';

@inject('user')
@observer
class BlockHeader extends Component {
    componentDidMount() {
        const { user } = this.props;
        AjaxModule.get(RouteStore.api.me).then((data) => {
            user.update(data);
        }).catch((error) => {
            console.log(error.message);
        });
    }

    handleExitClick = () => {
        const { user } = this.props;
        AjaxModule.doAxioDelete(RouteStore.api.users.exit)
            .then((response) => {
                if (response.status !== 200 || response.data.status) {
                    throw new Error(response.data.message || response.data);
                }
                window.location.replace(RouteStore.pages.main);
                user.delete();
            }).catch((error) => {
                console.log(error.message);
            });
    };

    render() {
        const authTabs = this._getAuthTabs();
        const contentTabs = this._getContentTabs();
        return (
            <div className="header">
                <div className="header-left">
                    <NavLink className="header-logo" exact to={RouteStore.pages.main}>
                        <img className="logo" src={LogoImage} alt="logo"/>
                    </NavLink>
                    <NavLink className="header-button" exact to={RouteStore.pages.main} data-id="1">
                        <Button text="Главная" type={Button.types.block}/>
                    </NavLink>
                    <NavLink className="header-button" to={RouteStore.pages.collections} data-id="2">
                        <Button text="Подборки" type={Button.types.block}/>
                    </NavLink>
                    {contentTabs}
                </div>
                {authTabs}
            </div>
        );
    }

    _getAuthTabs = () => {
        const { user } = this.props;
        const avatar = user.avatar || AuthorAvatar;
        if (user.login) {
            return (
                <div className="header-right">
                    <NavLink className='header-create header-button__main' to={RouteStore.pages.posts.new} data-id="0">
                        <Button text="Создать пост" type={Button.types.block}/>
                    </NavLink>
                    <NavLink className="header-button" to={`/users/${user.login}`} data-id="5" >
                        <Button text={`${user.name}`} type={Button.types.block}/>
                        <img className="user" src={avatar} alt="user"/>
                    </NavLink>
                    <div className="header-exit" onClick={this.handleExitClick}>
                        <img className="exit" src={ExitIcon} alt="exit"/>
                    </div>
                </div>
            );
        }
        return (
            <div className="header-right">
                <NavLink className='header-button' to={RouteStore.pages.user.login}>
                    <Button text="Войти" type={Button.types.block}/>
                </NavLink>
            </div>
        );
    };

    _getContentTabs = () => {
        const { user } = this.props;

        if (!user.login) {
            return null;
        }

        return (
            <>
                <NavLink className="header-button" to="/feed" data-id="3">
                    <Button text="Лента" type={Button.types.block}/>
                </NavLink>
                <NavLink className="header-button" to={RouteStore.pages.search} data-id="4">
                    <Button text="Поиск" type={Button.types.block}/>
                </NavLink>
            </>
        );
    };
}

export default BlockHeader;
