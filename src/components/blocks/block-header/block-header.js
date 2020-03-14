import React, { Component } from 'react';
import RouteStore from 'store/routes';

import Button from 'components/fragments/button/button';

import './block-header.scss';

class BlockHeader extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const { user } = this.props;
        return (
            <div className="header">
                <Button text="Главная" type="type:block" onAction={this.handleClick}/>
                { !!user && <Button text={user.name} type="type:block" onAction={() => {}}/>}
                { !user && <Button text="Войти" type="type:block" onAction={this.handleLoginClick}/>}
            </div>
        );
    }

    handleLoginClick(event) {
        event.preventDefault;
        window.location.href = RouteStore.pages.posts.new;
    }

    handleClick(event) {
        event.preventDefault();
        console.log('Нажали!');
    }
}

export default BlockHeader;
