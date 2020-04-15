import React from 'react';

import BlockSlider from 'components/blocks/block-slider/block-slider';

import ImageDonut from 'assets/img/index/expose/donut.jpeg';

import './block-layout-index-slot-expose.scss';


export default class BlockLayoutIndexSlotExpose extends React.Component {
    sliderItems = [
        // TODO: Поддержать карусель и правильные картинки, раскомментировать
        // {
        //     title: 'Подписываться',
        //     description: 'Авторы предоставляют разный контент, который нельзя пропустить!',
        //     picture: ImageDonut
        // },
        {
            title: 'Поддерживать',
            description: 'Дарите понравившемуся автору донат или два!',
            picture: ImageDonut
        },
        // {
        //     title: 'Творить',
        //     description: 'Рассказывайте о том, что делаете и получайте за это ₽',
        //     picture: ImageDonut
        // },
        // {
        //     title: 'Найти работы на любой вкус',
        //     description: 'Фильтруйте работы по категориям, находите авторов и их публикации',
        //     picture: ImageDonut
        // },
        // {
        //     title: 'Устанавливать цели',
        //     description: 'Укажите цель и сумму, которая необходима для ее свершения',
        //     picture: ImageDonut
        // },
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
