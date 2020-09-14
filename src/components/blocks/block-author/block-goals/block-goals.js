import React, { Component } from 'react';
import { inject } from 'mobx-react';

import { BlockGoal } from 'components/blocks/block-author/block-goals/block-goal/block-goal';
import { GoalModal } from 'components/blocks/block-author/block-goals/goal-modal/goal-modal';
import Button from 'components/fragments/button/button';
import { GoalListItem } from 'components/fragments/goal-list-item/goal-list-item';
import AjaxModule from 'services/ajax';
import { getRouteWithID } from 'services/getRouteWithId';
import RouteStore from 'store/routes';

import './block-goals.scss';

@inject('user')
class BlockGoals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            goals: props.current?.goals || {},
        };
    }

    handleAddGoal = (event) => {
        event.preventDefault();
        this.setState({ isModalOpen: true });
    };

    handleCloseModal = () => {
        this.setState({ isModalOpen: false });
    };

    handleSuccessChange = (data) => {
        this.handleCloseModal();
        this.setState({ goals: data });
    };

    render() {
        const { user, current, showToast } = this.props;
        const { isModalOpen, goals: { sum_total, sum_wanted, goals } } = this.state;

        return (
            <div className="author-goals">
                <div className="author-goals__title">Цели</div>
                {goals?.length > 0 ? (
                    <div className="author-goals__body">
                        <BlockGoal total={sum_total} wanted={sum_wanted}/>
                        {goals.map((goal) => (
                            <GoalListItem key={goal.id} {...goal} />
                        ))}
                    </div>
                ) : (
                    <div className="author-goals__body">Автор пока не добавил целей</div>
                )}
                {user.login === current?.login && (
                    <Button
                        className="author-goals__add"
                        text="Добавить цель"
                        type={Button.types.block}
                        onAction={this.handleAddGoal}
                    />
                )}
                { isModalOpen && <GoalModal onClose={this.handleCloseModal} onSuccess={this.handleSuccessChange} showToast={showToast}/> }
            </div>
        );
    }
}

export { BlockGoals };
