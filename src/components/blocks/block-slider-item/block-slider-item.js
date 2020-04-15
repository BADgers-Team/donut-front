import React from 'react';

import './block-slider-item.scss';


export default class BlockSliderItem extends React.Component {
    render() {
        const {title, description, picture} = this.props;

        return (
            <div className="block-slider-item">
                <div className="block-slider-item__dimmer"/>
                <img className="block-slider-item__picture" alt={title} src={picture}/>
                <div className="block-slider-item__text">
                    <div className="block-slider-item__title">
                        {title}
                    </div>
                    <div className="block-slider-item__description">
                        {description}
                    </div>
                </div>
            </div>
        );
    }
}
