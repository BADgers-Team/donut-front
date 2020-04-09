import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import RouterStore from 'store/routes';

import Button from 'components/fragments/button/button';
import Input from 'components/fragments/input/input';

import AjaxModule from 'services/ajax';

import './block-subscription-form.scss';

class BlockSubscriptionForm extends Component {
    constructor(props) {
        super(props);
      
        this.state = { 
            redirect: false,
            showFree: false 
        };
        this._form = React.createRef();
    }

    handleFreeClick = () => {
        this.setState({ showFree: !this.state.showFree});
    }
    
    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to={RouterStore.pages.main} />
        }
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
                                <Input type={Input.types.checkbox} name="freeCheckbox" label="Бесплатно" material={true} onAction={this.handleFreeClick}/>
                            </div>
                            {!this.state.showFree && <div className="control-price__input">
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

export { BlockSubscriptionForm };
