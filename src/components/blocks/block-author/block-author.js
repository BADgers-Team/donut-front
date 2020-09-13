import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

import { BlockGoals } from 'components/blocks/block-author/block-goals/block-goals';
import { InputHiddenFile } from 'components/fragments/input-hidden-file/input-hidden-file';
import { ProfileModal } from 'components/blocks/block-author/profile-modal/profile-modal';

import { FIELDS_TYPES, validate } from 'services/validation';
import AjaxModule from 'services/ajax';
import RouterStore from 'store/routes';
import Button from 'components/fragments/button/button';

import Avatar from 'assets/img/michael.png';
import './block-author.scss';

@inject('user')
@observer
class BlockAuthor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            errors: {
                avatar: null,
            },
        };
    }

    handleAvatarUploadChange = (event) => {
        const { target } = event;
        const file = target?.files[0];

        this.setState({
            errors: {
                avatar: validate(file, FIELDS_TYPES.FILE),
            }
        }, () => this._makeFileRequest(file));
    };

    _makeFileRequest(file) {
        const { errors } = this.state;
        const { user } = this.props;

        const isFileInvalid = Boolean(errors.avatar);
        if (!isFileInvalid) {
            const reqBody = file;
            // this.setState({isDisabled: Input.startLoader()}, this.checkDisabledButtonStyle);
            const data = new FormData();
            // TODO временно шлем ток картинки
            data.append('image', reqBody, reqBody.name);
            AjaxModule.doAxioPut(RouterStore.api.users.avatar, data, 'multipart/form-data')
                .then((response) => {
                    if (response.data?.status) {
                        throw new Error(response.data?.message);
                    }
                    const newUser = user;
                    newUser.avatar = response?.data?.link;
                    user.update(newUser);
                    // this.setState({isDisabled: Input.finishLoader(true)}, this.checkDisabledButtonStyle);
                })
                .catch((error) => {
                    console.log(error);
                    this.setState({
                        errors: {
                            file: error.message,
                        }
                    });
                });
        }
    }

    handleChangeClick = () => {
        this.setState({ isModalOpen: true });
    };

    handleCloseModal = () => {
        this.setState({ isModalOpen: false });
    };

    handleSuccessChange = (data) => {
        const { user } = this.props;

        this.handleCloseModal();
        user.update(data);
        window.location.replace(`/users/${user.login}`);
    };


    render() {
        const { current, user, showToast } = this.props;
        const { isModalOpen } = this.state;

        const subscriptions = current.number_of_subscriptions || 0;
        const posts = current.number_of_posts || 0;
        const followers = current.number_of_followers || 0;
        const description = current.description || '';
        const avatar = current.login === user.login ? user.avatar : (current.avatar || Avatar);
        const wallet = current.wallet || 'не установлен';
        // TODO: сделать plural на слова в info
        return (
            <>
                <div className="author-info">
                    {user.login === current?.login ? (
                        <InputHiddenFile
                            id="upload_avatar"
                            accept="image/jpg" // TODO: change to validation
                            onChange={this.handleAvatarUploadChange}
                        >
                            <img className="author-info__avatar" src={avatar} alt="avatar"/>
                        </InputHiddenFile>
                    ) : (
                        <img className="author-info__avatar" src={avatar} alt="avatar"/>
                    )}
                    <div className="author-info__login">{`@${current.login}`}</div>
                    <div className="author-info__name">{current.name}</div>
                    <div className="author-info__info">
                        {`${posts} постов | ${subscriptions} подписок | ${followers} подписчиков`}
                    </div>
                    <div className="author-info__description">{description}</div>
                    <div className="author-info__wallet">Яндекс.Кошелек: {wallet}</div>
                    {user.login === current?.login && (
                        <>
                            <Button
                                className="author-info__edit"
                                text="Редактировать профиль"
                                type={Button.types.block}
                                onAction={this.handleChangeClick}
                            />
                            { isModalOpen && <ProfileModal user={current} onClose={this.handleCloseModal} onSuccess={this.handleSuccessChange}/> }
                        </>
                    )}
                    <BlockGoals {...this.props} showToast={showToast} />
                </div>
            </>
        );
    }
}

export { BlockAuthor };
