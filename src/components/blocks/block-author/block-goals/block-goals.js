import React, { Component } from 'react';
import { GoalModal } from 'components/blocks/block-author/block-goals/goal-modal/goal-modal';
import Button from 'components/fragments/button/button';
import './block-goals.scss';

class BlockGoals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            goals: [],
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
        const { isModalOpen } = this.state;
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
                <div className="author-goals__body">
                    {/*{subscriptionsNodes}*/}
                </div>
                { isModalOpen && <GoalModal onClose={this.handleCloseModal} onSuccess={this.handleSuccessChange}/> }
            </div>
        );
    }
}

export { BlockGoals };
