import React from 'react';

import BlockSlider from 'components/blocks/block-slider/block-slider';

import ImageDonut from 'assets/img/index/expose/donut.jpeg';

import './block-layout-index-slot-expose.scss';


export default class BlockLayoutIndexSlotExpose extends React.Component {
    sliderItems = [
        {title: 'Поддерживать', description: 'Дарите понравившемуся автору донат или два!', picture: ImageDonut},
    ];

    render() {
        return (
            <div className="block-layout-index-slot-expose">
                <div className="block-layout-index-slot-expose__title">
                    На нашем сервисе вы можете...
                </div>
                <div className="block-layout-index-slot-expose__slider">
                    <BlockSlider items={this.sliderItems}/>
                </div>
            </div>
        );
    }
}
