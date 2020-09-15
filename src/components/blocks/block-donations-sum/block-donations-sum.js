import React, { Component } from 'react';

import './block-donations-sum.scss';
import DonationsIcon from 'assets/img/mini-donut.svg';

class DonationsSum extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { sum, iconClass, textClass } = this.props;
        return (
            <>
                <img className={iconClass} src={DonationsIcon} alt="donations" />
                <div className={textClass}>{sum} ₽</div>
            </>
        );
    }
}

export { DonationsSum };