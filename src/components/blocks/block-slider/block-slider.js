import React from 'react';

import BlockSliderItem from 'components/blocks/block-slider-item/block-slider-item';

import {debounce} from 'utils/functions';

import './block-slider.scss';

export default class BlockSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showLeftArrow: false,
            showRightArrow: true,
        };

        this.itemsContainerRef = React.createRef();
    }

    handleClickArrowLeft = () => {
        this.container.scrollBy({left: -750, behavior: 'smooth'});

        const {showRightArrow} = this.state;
        if (!showRightArrow) {
            this.setState({showRightArrow: true});
        }
    };

    handleClickArrowRight = () => {
        this.container.scrollBy({left: 750, behavior: 'smooth'});

        const {showLeftArrow} = this.state;
        if (!showLeftArrow) {
            this.setState({showLeftArrow: true});
        }
    };

    handleScroll = () => {
        const {showLeftArrow, showRightArrow} = this.state;
        const maxScrollLeft = this.container.scrollWidth - this.container.clientWidth;

        // TODO: Посмотреть внимательно, кажется, тут можно оптимизировать

        if (this.container.scrollLeft > 0 && !showLeftArrow) {
            this.setState({showLeftArrow: true});
        }

        if (this.container.scrollLeft === 0 && showLeftArrow) {
            this.setState({showLeftArrow: false});
        }

        if (this.container.scrollLeft < maxScrollLeft && !showRightArrow) {
            this.setState({showRightArrow: true});
        }

        if (this.container.scrollLeft === maxScrollLeft && showRightArrow) {
            this.setState({showRightArrow: false});
        }
    };

    get container() {
        return this.itemsContainerRef.current;
    }

    render() {
        const {items} = this.props;
        const {showLeftArrow, showRightArrow} = this.state;

        return (
            <div className="block-slider">
                <div className="block-slider__items" ref={this.itemsContainerRef} onScroll={debounce(this.handleScroll, 10)}>
                    {items.map((item, idx) => <BlockSliderItem key={idx} {...item} />)}
                </div>
                {showLeftArrow && (
                    <div className="block-slider__arrow block-slider__arrow_left" onClick={this.handleClickArrowLeft}>
                        <i className="fas fa-chevron-left"/>
                    </div>
                )}
                {showRightArrow && (
                    <div className="block-slider__arrow block-slider__arrow_right" onClick={this.handleClickArrowRight}>
                        <i className="fas fa-chevron-right"/>
                    </div>
                )}
            </div>
        );
    }
}
