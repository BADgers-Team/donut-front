import React from 'react';
import {Link} from 'react-router-dom';
import { inject } from 'mobx-react';
import { BlockModal } from 'components/blocks/block-modal/block-modal';
import Button from 'components/fragments/button/button';
import RouteStore from 'store/routes';
import { getRouteWithID } from 'services/getRouteWithId';

import './block-no-wallet-modal.scss';

@inject('user')
export default class BlockNoWalletModal extends React.Component {
    render() {
        const {user, open, onClose} = this.props;

        return (
            <BlockModal open={open} onClose={onClose} title="Предупреждение">
                <div className="block-no-wallet-modal">
                    <div className="block-no-wallet-modal__content">
                        Вы не указали номер кошелька для сервиса Яндекс.Деньги. Вы не сможете получать пожертвования к этому посту, пока не заполните это поле в своем профиле.
                    </div>
                    <div className="block-no-wallet-modal__control-list">
                        <div className="block-no-wallet-modal__control">
                            <Link to={getRouteWithID(RouteStore.pages.user.profile, user.login)}>
                                <Button primary text="Перейти в профиль"/>
                            </Link>
                        </div>
                        <div className="block-no-wallet-modal__control" onClick={onClose}>
                            <Button outline text="Продолжить создание"/>
                        </div>
                    </div>
                </div>
            </BlockModal>
        )
    }
}
