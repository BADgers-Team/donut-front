import React, { Component } from 'react';
import Input from 'components/fragments/input/input';
import Button from 'components/fragments/button/button';

import './donat-form.scss';
import DonutPicture from 'assets/img/donut.png';
import { PRICE } from 'store/const';

const MSG_PLACEHOLDER = 'Напишите сообщение... (опционально)';

class DonatForm extends Component {
    render() {
        const { author } = this.props;
        return (
            <form className="donat-form">
                <div className="donat-form__label">
                    Подарите&nbsp;
                    <div className="donat-form__author">{author}</div>
                    &nbsp;донат!
                </div>
                <div className="donat-form__choose-count">
                    <div className="donat-form__donut">
                        <img className="donat-form__donut-picture" src={DonutPicture} alt="donut"/>
                        <div className="donat-form__donut-price">{PRICE} ₽</div>
                    </div>
                    <div className="donat-form__multi">x</div>
                    <Input custom="donat-form__input" type={Input.types.text} value="1"/>
                    <div className="donat-form__counts">
                        <div className="donat-form__count donat-form__count__active">1</div>
                        <div className="donat-form__count">2</div>
                        <div className="donat-form__count">5</div>
                    </div>
                </div>
                <Input custom="donat-form__message" type={Input.types.textarea} placeholder={MSG_PLACEHOLDER}/>
                <Button className="donat-form__submit" type={Button.types.submit} text="Задонатить 32 ₽"/>
            </form>
        );
    }
}

export { DonatForm };
