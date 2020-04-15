import React from 'react';

import BlockSlider from 'components/blocks/block-slider/block-slider';

import ImageCreate from 'assets/img/index/expose/create.jpeg';
import ImageDonut from 'assets/img/index/expose/donut.jpeg';
import ImageEverything from 'assets/img/index/expose/everything.png';
import ImageObjectives from 'assets/img/index/expose/objectives.png';
import ImageSubscribe from 'assets/img/index/expose/subscribe.jpeg';

import './block-layout-index-slot-expose.scss';


export default class BlockLayoutIndexSlotExpose extends React.Component {
    sliderItems = [
        // TODO: Поддержать правильные картинки
        {
            title: 'Подписываться',
            description: 'Авторы предоставляют разный контент, который нельзя пропустить!',
            picture: ImageSubscribe
        },
        {
            title: 'Поддерживать',
            description: 'Дарите понравившемуся автору донат или два!',
            picture: ImageDonut
        },
        {
            title: 'Творить',
            description: 'Рассказывайте о том, что делаете и получайте за это ₽',
            picture: ImageCreate
        },
        {
            title: 'Найти работы на любой вкус',
            description: 'Фильтруйте работы по категориям, находите авторов и их публикации',
            picture: ImageEverything
        },
        {
            title: 'Устанавливать цели',
            description: 'Укажите цель и сумму, которая необходима для ее свершения',
            picture: ImageObjectives
        },
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
