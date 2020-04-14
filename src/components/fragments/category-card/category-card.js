import React from 'react';

import './category-card.scss';


export default class CategoryCard extends React.Component {
    render() {
        const {title, picture} = this.props;

        return (
            <div className="category-card">
                <img className="category-card__picture" alt={title} src={picture}/>
                <div className="category-card__dimmer"/>
                <div className="category-card__title">{title}</div>
            </div>
        );
    }
}
