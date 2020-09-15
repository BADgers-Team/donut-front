import React from 'react';

import { GoalDeleteModal } from 'components/blocks/block-author/block-goals/goal-delete-modal/goal-modal';

import './goal-list-item.scss';

class GoalListItem extends React.Component {
    state = {
        isModalOpen: false,
    };

    handleCloseModal = () => {
        this.setState({ isModalOpen: false });
    };

    handleDeleteClick = () => {
        this.setState({ isModalOpen: true });
    };

    render() {
        const { id, title, sum_wanted, isCurrentUser } = this.props;
        const { isModalOpen } = this.state;

        return (
            <div className="goal-list-item">
                <div className="goal-list-item__content">
                    <div className="goal-list-item__title">
                        {title}
                    </div>
                    <div className="goal-list-item__sum">
                        {sum_wanted} ₽
                    </div>
                </div>
                {isCurrentUser && (
                    <div className="goal-list-item__cross" onClick={this.handleDeleteClick}>
                        <i className="fas fa-times" />
                    </div>
                )}

                { isModalOpen && (
                    <GoalDeleteModal id={id} title={title} onClose={this.handleCloseModal}/>
                )}
            </div>
        );
    }
}

export { GoalListItem };
