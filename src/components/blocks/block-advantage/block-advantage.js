import React from 'react';

import './block-advantage.scss';


export default class BlockAdvantage extends React.Component {
    render() {
        const {title, icon} = this.props;

        return (
            <div className="block-advantage">
                <div className="block-advantage__icon">
                    <i className={icon}/>
                </div>
                <div className="block-advantage__title">
                    {title}
                </div>
            </div>
        );
    }
}
