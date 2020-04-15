import React, { Component } from 'react';

import EyeIcon from 'assets/img/eye.svg';

import './block-seen.scss';

class Seen extends Component {
    render() {
        const seen = this.props.seen;
        const { iconClass, textClass} = this.props

        return (
            <>      
                <img className={iconClass} src={EyeIcon} alt="seen"/>
                <div className={textClass}>{seen}</div>            
            </>
        );
    }
}

export { Seen };