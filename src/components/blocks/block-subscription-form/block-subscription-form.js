import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { inject } from 'mobx-react';

import RouterStore from 'store/routes';
import AjaxModule from 'services/ajax';
import { getRouteWithID } from 'services/getRouteWithId';

import Button from 'components/fragments/button/button';
import Input from 'components/fragments/input/input';


import './block-subscription-form.scss';

@inject('user')
class BlockSubscriptionForm extends Component {
    constructor(props) {
        super(props);
      
        this.state = { 
            redirect: false 
        };
        this._form = React.createRef();
    }
    
    render() {
        const { redirect } = this.state;
        const { user } = this.props;

        if (redirect) {
            const profileUrl = getRouteWithID(RouterStore.pages.user.profile, user.login);
            return <Redirect to={profileUrl} />;
        }
        return (
            <form ref={this._form} id="subscription_form">
                <div className="form__subscriptions">
                    {/* TODO тут будут подписки */}
                </div>

                <div className="form__inputs">
                    <div className="form-input input-title">
                        <Input label="Заголовок" type={Input.types.text} name="title" placeholder="Добавьте заголовок"/>
                    </div>
                    <div className="form-input input-description">
                        <Input label="Описание" type={Input.types.textarea} name="description" placeholder="Напишите что-нибудь..."/>
                    </div>
                    <div className="form__controls-subscription">
                        <div className="form-control control-price">
                            <label className='price-label'>Цена</label>
                            <div className="control-price__input">
                                <Input label="₽" type={Input.types.number} name="price" min={16} defaultValue={16}/>
                            </div>
                        </div>
                        <div className="form-control control-button">    
                            <Button text="Создать подписку" type={Button.types.submit} isDisabled={this.state.isDisabled} onAction={this.handleCreateSubscriptionClick}/>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    handleCreateSubscriptionClick = (event) => {
        event.preventDefault();

        const form = this._form.current;
        let reqBody = {
            title: form.title.value,
            description: form.description.value,
            sum: form.price ? parseInt(form.price.value, 10) : 0,
        };

        // TODO временная валидация
        if (!reqBody.title || !reqBody.description) {
            alert('Заполните навание и описание!');
            return;
        }

        AjaxModule.post(RouterStore.api.subscriptions.new, reqBody).then(() => {
            this.setState({ redirect: true });
        }).catch((error) => {
            console.error(error.message);
        });
    }
}

export default BlockSubscriptionForm;
