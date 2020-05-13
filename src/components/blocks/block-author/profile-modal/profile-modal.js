import React, { Component } from 'react';

import { BlockModal } from 'components/blocks/block-modal/block-modal';
import Button from 'components/fragments/button/button';
import RouteStore from 'store/routes';
import AjaxModule from 'services/ajax';
import { FIELDS_TYPES, validate } from 'services/validation';

import './profile-modal.scss';

const MODAL_TITLE = 'Изменение профиля';

export class ProfileModal extends Component {
    constructor(props) {
        super(props);

        const { user } = props;
        this.state = {
            open: props.open || true,
            errors: {
                name: null,
                login: null,
                description: null,
            },
            name: user.name,
            login: user.login,
            description: user.description,
        };
    }

    handleChangeName = (event) => {
        const value = event.target.value;
        this.setState({ name: value });
    };

    handleChangeLogin = (event) => {
        const value = event.target.value;
        this.setState({ login: value });
    };

    handleChangeDescription = (event) => {
        const value = event.target.value;
        this.setState({ description: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { name, login, description } = this.state;
        // this.setState({
        //     errors: {
        //         title: validate(goal, FIELDS_TYPES.SHORT_CONTENT),
        //         sum: validate(sum, FIELDS_TYPES.SUM),
        //     }
        // }, this._makeRequest);
        this._makeRequest();
    };

    _makeRequest() {
        const { name, login, description, errors } = this.state;
        const { onSuccess } = this.props;
        // const isFormValid = Array.from(Object.values(errors)).filter(error => Boolean(error)).length === 0;
        const isFormValid = true;
        if (isFormValid) {
            AjaxModule.doAxioPatch(RouteStore.api.me, {
                name, login, description
            }).then((response) => {
                onSuccess && onSuccess(response.data);
            }).catch((error) => {
                console.log(error.message);
            });
        }
    }

    render() {
        const { open, name, login, description, errors } = this.state;
        const { onClose } = this.props;

        return (
            <BlockModal
                open={open}
                title={MODAL_TITLE}
                onClose={onClose}
            >
                <form className="profile__form" onSubmit={this.handleSubmit}>
                    <div className="profile__subtitle">Здесь вы можете изменить основные данные о себе</div>
                    <label className="profile__label" htmlFor="title">
                        Имя
                        <span style={{color: 'red'}}> *</span>
                    </label>
                    <input className="profile__input" type="text" name="title" value={name} onChange={this.handleChangeName}/>
                    <label className="profile__label" htmlFor="login">
                        Логин
                        <span style={{color: 'red'}}> *</span>
                    </label>
                    <input className="profile__input" type="text" name="login" value={login} onChange={this.handleChangeLogin}/>
                    <label className="profile__label" htmlFor="description">О себе</label>
                    <textarea className="profile__textarea" name="description" value={description} placeholder="Расскажите несколько слов о себе" onChange={this.handleChangeDescription}/>
                    {/*{errors.title && <span className="form-input__error modal-input__error">{errors.title}</span>}*/}
                    <Button className="profile__submit" type={Button.types.submit} text="Сохранить"/>
                </form>
            </BlockModal>
        );
    }
}
