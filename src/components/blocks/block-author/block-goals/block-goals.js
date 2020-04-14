import React, { Component } from 'react';
import { GoalModal } from 'components/blocks/block-author/block-goals/goal-modal/goal-modal';
import Button from 'components/fragments/button/button';
import './block-goals.scss';
import {BlockGoal} from 'components/blocks/block-author/block-goals/block-goal/block-goal';

class BlockGoals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            goals: props.user?.goals || [],
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
        const { user, current } = this.props;
        const { isModalOpen, goals } = this.state;
        const goalsNodes = goals.map((goal) => {
            return <BlockGoal goal={goal} key={goal.id}/>;
        });

        return (
            <div className="author-goals">
                <div className="author-goals__title">Цели</div>
                {user.login === current?.login && (
                    <Button
                        className="author-goals__add"
                        text="Добавить цель"
                        type={Button.types.block}
                        onAction={this.handleAddGoal}
                    />)}
                {goalsNodes.length > 0 ? (
                    <div className="author-goals__body">
                        {goalsNodes}
                    </div>
                ) : (
                    <div className="author-goals__body">Автор пока не добавил целей</div>
                )}
                { isModalOpen && <GoalModal onClose={this.handleCloseModal} onSuccess={this.handleSuccessChange}/> }
            </div>
        );
    }
}

export { BlockGoals };
