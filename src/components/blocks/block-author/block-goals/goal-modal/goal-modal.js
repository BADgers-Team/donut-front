import React, { Component } from 'react';
import { BlockModal } from 'components/blocks/block-modal/block-modal';
import Button from 'components/fragments/button/button';
import RouteStore from 'store/routes';
import AjaxModule from 'services/ajax';

import './goal-modal.scss';
import {FIELDS_TYPES, validate} from 'services/validation';

const MODAL_TITLE = 'Новая цель';

export class GoalModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open || true,
            goal: '',
            sum: 16,
            errors: {
                title: null,
                sum: null,
            }
        };
    }

    handleGoalChange = (event) => {
        const value = event.target.value;
        this.setState({ goal: value });
    };

    handleSumChange = (event) => {
        const value = event.target.value;
        this.setState({ sum: value });
    };

    handleSubmit = (event) => {
        const { goal, sum } = this.state;
        event.preventDefault();

        this.setState({
            errors: {
                title: validate(goal, FIELDS_TYPES.SHORT_CONTENT),
                sum: validate(sum, FIELDS_TYPES.SUM),
            }
        }, this._makeRequest);
    };

    _makeRequest() {
        const { goal, sum, errors } = this.state;
        const { onSuccess } = this.props;
        const isFormValid = Array.from(Object.values(errors)).filter(error => Boolean(error)).length === 0;
        if (isFormValid) {
            AjaxModule.post(RouteStore.api.goals, {
                title: goal,
                sum_wanted: +sum,
            }).then((data) => {
                onSuccess && onSuccess(data);
            }).catch((error) => {
                console.log(error.message);
            });
        }
    }

    render() {
        const { open, goal, sum, errors } = this.state;
        const { onClose } = this.props;

        return (
            <BlockModal
                open={open}
                title={MODAL_TITLE}
                onClose={onClose}
            >
                <form className="goal__form" onSubmit={this.handleSubmit}>
                    <div className="goal__subtitle">Расскажите своим подписчикам, чего вы хотите достичь с помощью Give me a donut!</div>
                    <label className="goal__label" htmlFor="title">
                        Моя цель
                        <span style={{color: 'red'}}> *</span>
                    </label>
                    <textarea className="goal__textarea" name="title" value={goal} placeholder="Опишите кратко свою цель" onChange={this.handleGoalChange}/>
                    {errors.title && <span className="form-input__error modal-input__error">{errors.title}</span>}
                    <label className="goal__label" htmlFor="sum">Я хочу собрать</label>
                    <div>
                        <input className="goal__input" type="number" name="sum" value={sum} onChange={this.handleSumChange}/>
                        <label className="goal__input-after">₽</label>
                    </div>
                    {errors.sum && <span className="form-input__error modal-input__error">{errors.sum}</span>}
                    <Button className="goal__submit" type={Button.types.submit} text="Добавить цель"/>
                </form>
            </BlockModal>
        );
    }
}
