import React, { Component } from 'react';
import Input from 'components/fragments/input/input';
import Button from 'components/fragments/button/button';
import { DonatPayModal } from 'components/blocks/block-post-static/donat-form/donat-pay-modal/donat-pay-modal';

import './donat-form.scss';
import DonutPicture from 'assets/img/donut.png';
import { PRICE } from 'store/const';
import { FIELDS_TYPES, validate } from 'services/validation';
import { inject } from 'mobx-react';

const MSG_PLACEHOLDER = 'Напишите сообщение... (опционально)';
const COUNTS = [1, 2, 5];

@inject('user', 'post')
class DonatForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 1,
            showModal: false,
            error: null,
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

        this.setState({
            error: validate(form.count?.value, FIELDS_TYPES.COUNT),
        }, () => {
            const { error } = this.state;
            const { post } = this.props;
            if (!error) {
                const message = form.message.value;
                const sum = form.submit.value.split(' ')[1];
                // post.updateDonate(sum, message, 'Донат');
                sessionStorage.setItem('payment_info', JSON.stringify({sum, message, payment_type: 'Донат', id: post.id}));
                this.openModal();
            }
        });
    };

    calculatePrice = () => {
        const { count } = this.state;
        return count * PRICE;
    };

    openModal = () => {
        this.setState({ showModal: true });
    };
    
    closeModal = () => {
        this.setState({ showModal: false });
    };

    handleSuccessChange = () => {
        this.closeModal();
    };

    render() {
        const { author, current, showToast } = this.props;
        const { count, error } = this.state;
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
            <>
                {this.state.showModal && (
                    <DonatPayModal
                        id={current.id}
                        title={current.title}
                        author={current.author}
                        price={price}
                        message={current.message}
                        onClose={this.closeModal}
                        onSuccess={this.handleSuccessChange}
                        showToast={showToast}
                    />
                )}

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
                        <Input custom="donat-form__input" type={Input.types.text} value={count} onAction={this.handleChangeCount} name="count"/>
                        <div className="donat-form__counts">
                            {countsNodes}
                        </div>
                    </div>
                    {error && <span className="form-input__error sum-error">{error}</span>}
                    <Input custom="donat-form__message" name="message" type={Input.types.textarea} placeholder={MSG_PLACEHOLDER}/>
                    <Button className="donat-form__submit" type={Button.types.submit} text={`Задонатить ${price} ₽`} name="submit"/>
                </form>
            </>
        );
    }
}

export { DonatForm };
