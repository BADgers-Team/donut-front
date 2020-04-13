import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Loader from 'react-loader-spinner';
import AjaxModule from 'services/ajax';

import './layout-callback.scss';
import RouterStore from 'store/routes';

@inject('user')
@observer
class LayoutCallback extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { user } = this.props;
        const { pathname, search } = window.location;
        if (pathname && search) {
            AjaxModule.post(`${pathname}${search}`)
                .then((data) => {
                    if (data.status && data.status !== 200) {
                        throw new Error(data.message);
                    }
                    user.update(data);
                })
                .catch((error) => {
                    console.error(error.message);
                });
        }
        // TODO: обработка ошибки
    }

    render() {
        const { user } = this.props;
        if (user.name) {
            return <Redirect to={RouterStore.pages.user.login} />;
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
