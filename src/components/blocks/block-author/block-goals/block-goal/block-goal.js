import React, { Component } from 'react';

import './block-goal.scss';

class BlockGoal extends Component {
    render() {
        const { goal } = this.props;
        const wantedSum = goal?.sum_wanted;
        const getSum = goal?.sum_total;
        const percent = (getSum * 100 / wantedSum).toFixed(2);
        console.log(percent);
        return (
            <div className="author-goal">
                <div className="author-goal__statistics">{`${getSum} из ${wantedSum} ₽ собрано`}</div>
                <div className="author-goal__progress-bar">
                    { percent > 0 && <div className="author-goal__progress" style={{width: `${percent}`}}/> }
                </div>
                <div className="author-goal__info">{goal?.title || ''}</div>
            </div>
        );
    }
}

export { BlockGoal };
