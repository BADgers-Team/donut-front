import React from 'react';

import {classNames} from '../../../utils/class-names';

import './text.scss';


export default class Text extends React.Component {
    render() {
        const {children, primary} = this.props;
        const className = classNames([
            'text',
            primary && 'text_primary',
        ]);

        return (
            <div className={className}>
                {children}
            </div>
        );
    }
}
