import React from 'react';

import BlockAdvantage from 'components/blocks/block-advantage/block-advantage';

import './block-layout-index-slot-advantages.scss';


export default class BlockLayoutIndexSlotAdvantages extends React.Component {
    advantages = [
        {
            title: 'Находите таланты с помощью поиска по названию и тематике,  а также используя фильтры',
            icon: 'fas fa-search',
        },
        {
            title: 'Просматривайте подборки работ по различным категориям и вдохновляйтесь',
            icon: 'fas fa-th-large',
        },
        {
            title: 'Находите любимых авторов прямо здесь и делитесь их работами с друзьями',
            icon: 'fas fa-share-alt',
        },
    ];

    render() {
        return (
            <div className="block-layout-index-slot-advantages">
                <div className="block-layout-index-slot-advantages__title">
                    Что мы можем предложить...
                </div>
                <div className="block-layout-index-slot-advantages__advantages-list">
                    {this.advantages.map((advantage, idx) => (
                        <BlockAdvantage key={idx} {...advantage}/>
                    ))}
                </div>
            </div>
        );
    }
}
