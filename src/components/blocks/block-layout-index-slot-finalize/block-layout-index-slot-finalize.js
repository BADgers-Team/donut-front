import React from 'react';
import {Link} from 'react-router-dom';

import Button from 'components/fragments/button/button';

import RouteStore from 'store/routes';

import './block-layout-index-slot-finalize.scss';


export default class BlockLayoutIndexSlotFinalize extends React.Component {
    render() {
        return (
            <div className="block-layout-index-slot-finalize">
                <div className="block-layout-index-slot-finalize__title">
                    Ваши фанаты ждут вас
                </div>
                <div className="block-layout-index-slot-finalize__cta-button">
                    <Button
                        primary
                        wide
                        type={Button.types.link}
                        to={RouteStore.pages.user.login}
                        text="Присоединиться"
                    />
                </div>
                <div className="block-layout-index-slot-finalize__separator">
                    или
                </div>
                <div className="block-layout-index-slot-finalize__cta-link">
                    <Link to={RouteStore.pages.collections}>Посмотреть подборки</Link>
                </div>
            </div>
        );
    }
}
