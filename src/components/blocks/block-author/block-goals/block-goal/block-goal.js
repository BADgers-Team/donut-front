import React, { Component } from 'react';

import './block-goal.scss';

class BlockGoal extends Component {
    render() {
        const { total, wanted } = this.props;
        const percent = Math.min((total * 100 / wanted), 100).toFixed(2);
        return (
            <div className="author-goal">
                <div className="author-goal__statistics">{`Собрано ${total} из ${wanted} ₽`}</div>
                <div className="author-goal__progress-bar">
                    { percent > 0 && <div className="author-goal__progress" style={{width: `${percent}%`}}/> }
                </div>
            </div>
        );
    }
}

export { BlockGoal };
