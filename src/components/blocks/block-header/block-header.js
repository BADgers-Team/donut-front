import React, { Component } from 'react';
import RouteStore from 'store/routes';
import AjaxModule from 'services/ajax';

import Button from 'components/fragments/button/button';
import './block-header.scss';
import LogoImage from 'assets/img/logo.png';
import AuthorAvatar from 'assets/img/michael.jpg';
import ExitIcon from 'assets/img/exit.svg';
import { inject, observer } from 'mobx-react';
import {Link} from 'react-router-dom';
import { classNames } from '../../../utils/class-names';

@inject('user')
@observer
class BlockHeader extends Component {
    constructor(props) {
        super(props);
        const { pathname } = window.location;
        const tabs = {
            '/': 1,
            '/collections': 2,
            '/feed': 3,
            '/search': 4,
        };
        this.state = {
            activeTab: tabs[pathname] || 0,
        };
    }

    componentDidMount() {
        const { user } = this.props;
        AjaxModule.get(RouteStore.api.me).then((data) => {
            user.update(data);
            const { pathname } = window.location;
            const tabs = {
                '/': 1,
                '/collections': 2,
                '/feed': 3,
                '/search': 4,
            };
            tabs[`/users/${user.login}/`] = 5;
            debugger
            this.setState({
                activeTab: tabs[pathname] || 0,
            });
        }).catch((error) => {
            console.log(error.message);
        });
    }

    handleChangeTab = (event) => {
        let id = event.target.getAttribute('data-id');
        if (!id) {
            const parent = event.target.closest('[data-id]');
            if (!parent) {
                return;
            }
            id = parent.getAttribute('data-id');
        }
        this.setState({
            activeTab: +id,
        });
    };

    handleLogoClick = () => {
        this.setState({
            activeTab: 1,
        });
    };

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
                    <Link className="header-logo" to={RouteStore.pages.main} onClick={this.handleLogoClick}>
                        <img className="logo" src={LogoImage} alt="logo"/>
                    </Link>
                    <Link className={this._getTabClassName(1)} to={RouteStore.pages.main} onClick={this.handleChangeTab} data-id="1">
                        <Button text="Главная" type={Button.types.block}/>
                    </Link>
                    <Link className={this._getTabClassName(2)} to={RouteStore.pages.collections} onClick={this.handleChangeTab} data-id="2">
                        <Button text="Подборки" type={Button.types.block}/>
                    </Link>
                    {contentTabs}
                </div>
                {authTabs}
            </div>
        );
    }

    _getTabClassName(id) {
        const { activeTab } = this.state;
        return classNames([
            'header-button',
            activeTab === id && 'header-button__active',
        ]);
    }

    _getAuthTabs = () => {
        const { user } = this.props;
        const avatar = user.avatar || AuthorAvatar;
        if (user.login) {
            return (
                <div className="header-right">
                    <Link className='header-create header-button__main' to={RouteStore.pages.posts.new} onClick={this.handleChangeTab} data-id="0">
                        <Button text="Создать пост" type={Button.types.block}/>
                    </Link>
                    <Link className={this._getTabClassName(5)} to={`/users/${user.login}`} onClick={this.handleChangeTab} data-id="5" >
                        <Button text={`${user.name}`} type={Button.types.block}/>
                        <img className="user" src={avatar} alt="user"/>
                    </Link>
                    <div className="header-exit" onClick={this.handleExitClick}>
                        <img className="exit" src={ExitIcon} alt="exit"/>
                    </div>
                </div>
            );
        }
        return (
            <div className="header-right">
                <Link className='header-button' to={RouteStore.pages.user.login}>
                    <Button text="Войти" type={Button.types.block}/>
                </Link>
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
                <Link className={this._getTabClassName(3)} to="/feed" onClick={this.handleChangeTab} data-id="3">
                    <Button text="Моя лента" type={Button.types.block}/>
                </Link>
                <Link className={this._getTabClassName(4)} to={RouteStore.pages.search} onClick={this.handleChangeTab} data-id="4">
                    <Button text="Поиск" type={Button.types.block}/>
                </Link>
            </>
        );
    };
}

export default BlockHeader;
