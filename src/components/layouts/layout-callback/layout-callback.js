import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Loader from 'react-loader-spinner';

import { TOAST_TYPES } from 'components/fragments/toast/toast';
import AjaxModule from 'services/ajax';
import { getRouteWithID } from 'services/getRouteWithId';
import RouteStore from 'store/routes';

import './layout-callback.scss';

@inject('user')
@observer
class LayoutCallback extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { user, showToast } = this.props;
        const { pathname, search } = window.location;
        if (pathname && search) {
            AjaxModule.doAxioPost(`${pathname}${search}`)
                .then(({ data, status}) => {
                    if (status !== 200 && status !== 201) {
                        throw new Error(data.message);
                    }
                    user.update(data);
                })
                .catch((error) => {
                    showToast({ type: TOAST_TYPES.ERROR });
                    console.error(error.message);
                });
        }
        // TODO: обработка ошибки
    }

    render() {
        const { user } = this.props;
        if (user.login) {
            const path = getRouteWithID(RouteStore.pages.user.profile, user.login);
            return <Redirect to={path} />;
        }
        if (user.name) {
            return <Redirect to={RouteStore.pages.user.login} />;
        }
        return (
            <div className="callback">
                <div className="callback__loader">
                    <div className="callback__loader__text">Загрузка</div>
                    <Loader
                        type="Bars"
                        color="#FF6982"
                        height={120}
                        width={120}
                    />
                </div>
            </div>
        );
    }
}

export { LayoutCallback };
