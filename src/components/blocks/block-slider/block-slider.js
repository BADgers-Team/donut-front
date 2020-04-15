import React from 'react';

import BlockSliderItem from 'components/blocks/block-slider-item/block-slider-item';

import './block-slider.scss';


export default class BlockSlider extends React.Component {
    render() {
        const {items} = this.props;

        return (
            <div className="block-slider">
                <div className="block-slider__arrow">
                    <i className="fas fa-chevron-left"/>
                </div>
                <div className="block-slider__items">
                    {items.map((item, idx) => <BlockSliderItem key={idx} {...item} />)}
                </div>
                <div className="block-slider__arrow">
                    <i className="fas fa-chevron-right"/>
                </div>
            </div>
        );
    }
}
