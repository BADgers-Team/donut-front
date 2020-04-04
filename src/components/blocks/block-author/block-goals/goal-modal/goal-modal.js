import React, { Component } from 'react';
import { BlockModal } from 'components/blocks/block-modal/block-modal';
import Button from 'components/fragments/button/button';

const MODAL_TITLE = 'Новая цель';

export class GoalModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open || true,
            goal: '',
            sum: 16,
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

    handleSumbit = (event) => {
        event.preventDefault();
        const form = event.target;
    };

    render() {
        const { open, goal, sum } = this.state;
        const { onClose } = this.props;

        return (
            <BlockModal
                open={open}
                title={MODAL_TITLE}
                onClose={onClose}
            >
                <form onSubmit={this.handleSumbit}>
                    <div>Расскажите своим подписчикам, чего вы хотите достичь с помощью Give me a donut!</div>
                    <label htmlFor="goal-title">Моя цель</label>
                    <input type="text" name="goal-title" value={goal} placeholder="Опишите кратко свою цель" onChange={this.handleGoalChange}/>
                    <label htmlFor="goal-sum">Я хочу собрать</label>
                    <input type="number" min="16" max="2147483647" name="goal-sum" value={sum} onChange={this.handleSumChange}/>
                    <Button type={Button.types.submit} value="Добавить цель"/>
                </form>
            </BlockModal>
        );
    }
}
