import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { redirectToOauthServer } from 'services/oauth';
import Input from 'components/fragments/input/input';
import Button from 'components/fragments/button/button';
import AjaxModule from 'services/ajax';
import RouteStore from 'store/routes';

import GoogleIcon from 'assets/img/google.svg';
import VkIcon from 'assets/img/vk.svg';
import YandexIcon from 'assets/img/yandex.svg';
import './layout-login.scss';
import {getRouteWithID} from 'services/getRouteWithId';

@inject('user')
@observer
class LayoutLogin extends Component {
    handleGoogleClick = () => {
        redirectToOauthServer('google');
    };

    handleVKClick = () => {
        redirectToOauthServer('vk');
    };

    handleYandexClick = () => {
        redirectToOauthServer('yandex');
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const { user } = this.props;

        AjaxModule.post(RouteStore.api.users.confirm, {
            login: form.login?.value,
            name: form.name?.value,
            description: form.description?.value || ''
        }).then((data) => {
            user.update(data);
        }).catch((error) => {
            console.error(error.message);
        });
    };

    render() {
        const { user } = this.props;
        if (user.name && !user.login) {
            const login = this._generateLogin(user.email);
            return (
                <div className="layout-login">
                    <div className="layout-login__form">
                        <div className="layout-login__form-title">Приветствуем на Give Me a Donut!</div>
                        <div className="layout-login__form-subtitle">Заполните информацию о себе, чтобы другие пользователи сервиса смогли с вами познакомиться!</div>
                        <form className="layout-login__form-user" onSubmit={this.handleSubmit}>
                            <div className="layout-login__form-user-control">
                                <Input label="Имя" type={Input.types.text} name="name" defaultValue={user.name} custom="login__input"/>
                            </div>
                            <div className="layout-login__form-user-control">
                                <Input label="Логин" type={Input.types.text} name="login" defaultValue={login} custom="login__input"/>
                            </div>
                            <div className="layout-login__form-user-control">
                                <Input
                                    label="О себе"
                                    type={Input.types.textarea}
                                    name="description"
                                    placeholder="Добавьте пару слов о себе и своих увлечениях (опционально)"
                                    custom="login__text"
                                />
                            </div>
                            <div className="layout-login__form-user-control">
                                <Button text="Сохранить" type={Button.types.submit} className="control-submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
        if (user.login) {
            const path = getRouteWithID(RouteStore.pages.user.profile, user.login);
            return <Redirect to={path} />;
        }
        return (
            <div className="layout-login">
                <div className="layout-login__form">
                    <div className="layout-login__form-title">Вход</div>
                    <div className="layout-login__form-subtitle">Войдите с помощью социальных сетей</div>
                    <div className="layout-login__form-controls">
                        <div className="control" onClick={this.handleGoogleClick}>
                            <img className="icon" src={GoogleIcon} alt="google"/>
                        </div>
                        <div className="control" onClick={this.handleVKClick}>
                            <img className="icon" src={VkIcon} alt="vk"/>
                        </div>
                        <div className="control" onClick={this.handleYandexClick}>
                            <img className="icon" src={YandexIcon} alt="yandex"/>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    _generateLogin(email) {
        return email.split('@')[0];
    }
}

export { LayoutLogin };
