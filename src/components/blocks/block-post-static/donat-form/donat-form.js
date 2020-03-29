import React, { Component } from 'react';
import Input from 'components/fragments/input/input';
import Button from 'components/fragments/button/button';

import './donat-form.scss';
import DonutPicture from 'assets/img/donut.png';
import { PRICE } from 'store/const';

const MSG_PLACEHOLDER = 'Напишите сообщение... (опционально)';
const COUNTS = [1, 2, 5];

class DonatForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 1,
        };
    }

    handleChangeCount = (event) => {
        const count = event.target.value;
        this.setState({ count: count });
    };

    handleClickCount = (event) => {
        const clickedCount = event.target.textContent;
        this.setState({ count: clickedCount });
    };

    handleFormSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        console.log('Отправляем пончик...');
        console.log(form.message.value);
        console.log(form.submit.value.split(' ')[1]);
    };

    calculatePrice = () => {
        const { count } = this.state;
        return count * PRICE;
    };

    render() {
        const { author } = this.props;
        const { count } = this.state;
        const price = this.calculatePrice();
        const countsNodes = COUNTS.map((number, index) => {
            return (
                number === +count ?
                    <div className="donat-form__count donat-form__count__active" key={index}>{number}</div>
                    :
                    <div className="donat-form__count" key={index} onClick={this.handleClickCount}>{number}</div>
            );
        });

        return (
            <form className="donat-form" onSubmit={this.handleFormSubmit}>
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
                    <Input custom="donat-form__input" type={Input.types.text} value={count} onAction={this.handleChangeCount}/>
                    <div className="donat-form__counts">
                        {countsNodes}
                    </div>
                </div>
                <Input custom="donat-form__message" name="message" type={Input.types.textarea} placeholder={MSG_PLACEHOLDER}/>
                <Button className="donat-form__submit" type={Button.types.submit} text={`Задонатить ${price} ₽`} name="submit"/>
            </form>
        );
    }
}

export { DonatForm };
