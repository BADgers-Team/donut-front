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
            isFree: false,
        };
        this._form = React.createRef();
    }

    handleFreeClick = () => {
        this.setState({ isFree: !this.state.isFree});
    }
    
    render() {
        return (
            <form ref={this._form} id="subscription_form">
                <div className="form__subscriptions">
                    {/* TODO тут будут подписки */}
                </div>

                <div className="form__inputs">
                    <div className="subscription-header">Создание новой подписки</div>
                    <div className="form-input input-title">
                        <Input label="Заголовок" type={Input.types.text} name="title" placeholder="Добавьте заголовок"/>
                    </div>
                    <div className="form-input input-description">
                        <Input label="Описание" type={Input.types.textarea} name="description" placeholder="Напишите что-нибудь..."/>
                    </div>
                    <div className="form__controls-subscription">
                        <div className="form-control text-price">
                            Вы можете создать платную или бесплатную подписку. Для платной подписки укажите стоимоть в месяц. Минимальная стоимость платной подписки - 16 ₽.
                        </div>
                        <div className="form-control control-price">
                            <div className='bottom__free-checkbox'>
                                <Input type={Input.types.checkbox} name="freeCheckbox" label="Бесплатно" id="freeCheckbox" material={true} onAction={this.handleFreeClick} checked={this.state.isFree}/>
                            </div>
                            {!this.state.isFree && <div className="control-price__input">
                                <Input label="₽" type={Input.types.number} name="price" min={16} defaultValue={16} placeholder="Цена"/>
                            </div>}
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
            sum: form.price ? +form.price?.value : 0,
        };

        AjaxModule.post(RouterStore.api.subscriptions.new, reqBody).then((data) => {
            // this.setState({ subscriptions: data });
            this.clearInputs();
        }).catch((error) => {
            console.error(error.message);
        });
    }

    clearInputs = () => {
        const form = this._form.current;

        this.setState({ isFree: false});

        form.title.value = "";
        form.description.value = "";
        form.price.value = 16;
    }
}

export { BlockSubscriptionForm };
