import React, { Component } from 'react';

import { BlockModal } from 'components/blocks/block-modal/block-modal';
import Button from 'components/fragments/button/button';
import Text from 'components/fragments/text/text';
import RouteStore from 'store/routes';
import AjaxModule from 'services/ajax';
import { getRouteWithID } from 'services/getRouteWithId';
import { getUrlWithParams } from 'services/getUrlWithParams';

import './goal-modal.scss';

const MODAL_TITLE = 'Удаление цели';

export class GoalDeleteModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.open || true,
        };
    }

    _handleDelete = (params) => {
        const { id } = this.props;
        const path = getRouteWithID(RouteStore.api.goals.id, id);
        const pathWithParams = getUrlWithParams(path, params);

        AjaxModule.doAxioDelete(pathWithParams)
            .then((response) => {
                if (response.status !== 200 || response.data.status) {
                    throw new Error(response.data.message || response.data);
                }
                window.location.reload();
            }).catch((error) => {
                console.log(error.message);
            });
    };

    handleGoalAchievedClick = () => {
        this._handleDelete({ achieved: true });
    };

    handleGoalUnachievedClick = () => {
        this._handleDelete({ achieved: false });
    };

    render() {
        const { open } = this.state;
        const { title, onClose } = this.props;

        return (
            <BlockModal
                open={open}
                title={MODAL_TITLE}
                onClose={onClose}
            >
                <div className="goal-modal__content">
                    <div className="goal-modal__content-block">
                        Выбранная цель: <Text primary>{title}</Text>
                    </div>
                    <div className="goal-modal__content-block">
                        Вы достигли цели или вы просто хотите удалить?
                    </div>
                </div>
                <div className="goal-modal__controls">
                    <div className="goal-modal__controls-item">
                        <Button
                            primary
                            type={Button.types.block}
                            text="Цель достигнута"
                            onAction={this.handleGoalAchievedClick}
                        />
                    </div>
                    <div className="goal-modal__controls-item">
                        <Button
                            primary
                            type={Button.types.block}
                            text="Просто удалить"
                            onAction={this.handleGoalUnachievedClick}
                        />
                    </div>
                </div>
            </BlockModal>
        );
    }
}
