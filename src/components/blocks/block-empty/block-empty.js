import React, { Component } from 'react';

import EmptyIcon from 'assets/img/upset-donut.webp';
import Button from 'components/fragments/button/button';

import './block-empty.scss';

class BlockEmpty extends Component {
    render() {
        const { subtitle, link, linkText } = this.props;

        return (
            <div className="block-empty">
                <img className="block-empty__image" alt="empty" src={EmptyIcon}/>
                <div className="block-empty__title">Здесь пока пусто...</div>
                {subtitle && <div className="block-empty__subtitle">{subtitle}</div>}
                {link && (
                    <Button
                        primary
                        outline
                        type={Button.types.link}
                        to={link}
                        text={linkText}
                    />
                )}
            </div>
        );
    }
}

export { BlockEmpty };
